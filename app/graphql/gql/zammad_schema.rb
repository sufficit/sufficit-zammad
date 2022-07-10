# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

class Gql::ZammadSchema < GraphQL::Schema
  mutation      Gql::EntryPoints::Mutations
  query         Gql::EntryPoints::Queries
  subscription  Gql::EntryPoints::Subscriptions
  context_class Gql::Context::CurrentUserAware

  use GraphQL::Subscriptions::ActionCableSubscriptions, broadcast: true, default_broadcastable: false

  # Enable batch loading
  use GraphQL::Batch

  # Set maximum page size and depth to protect the system.
  #   Values may need to be adjusted in future.
  default_max_page_size 1000

  # The GraphQL introspection query has a depth of 13, so allow that in the development env.
  max_depth Rails.env.eql?('development') ? 13 : 10

  # Union and Interface Resolution
  def self.resolve_type(_abstract_type, obj, _ctx)
    "Gql::Types::#{obj.class.name}Type".constantize
  rescue
    raise GraphQL::RequiredImplementationMissingError, "Cannot resolve type for '#{obj.class.name}'."
  end

  # Relay-style Object Identification:

  # Return a string UUID for `object`
  def self.id_from_object(object, _type_definition = nil, _query_ctx = nil)
    object.to_gid_param
  end

  # Given a string UUID, find the object
  def self.object_from_id(id, _query_ctx = nil)
    GlobalID.find(id, only: [ActiveRecord::Base])
  end

  def self.unauthorized_object(error)
    raise Exceptions::Forbidden, error.message # Add a top-level error to the response instead of returning nil.
  end

  def self.unauthorized_field(error)
    raise Exceptions::Forbidden, error.message # Add a top-level error to the response instead of returning nil.
  end

  # Post-process errors and enrich them with meta information for processing on the client side.
  rescue_from(StandardError) do |err, _obj, _args, _ctx, _field|

    # Re-throw built-in errors that point to programming errors rather than problems with input or data - causes GraphQL processing to be aborted.
    [ArgumentError, IndexError, NameError, RangeError, RegexpError, SystemCallError, ThreadError, TypeError, ZeroDivisionError].each do |klass|
      raise err if err.is_a? klass
    end

    extensions = {
      type: err.class.name,
    }
    if Rails.env.development? || Rails.env.test?
      extensions[:backtrace] = Rails.backtrace_cleaner.clean(err.backtrace)
    end

    # We need to throw an ExecutionError, all others would cause the GraphQL processing to die.
    raise GraphQL::ExecutionError.new(err.message, extensions: extensions)
  end
end

# Temporary Hack: only process trigger events if ActionCable is enabled.
# TODO: Remove when this switch is not needed any more.
module GraphQL
  class Subscriptions
    if !method_defined?(:orig_trigger)
      alias orig_trigger trigger
      def trigger(...)
        return if ENV['ENABLE_EXPERIMENTAL_MOBILE_FRONTEND'] != 'true'

        orig_trigger(...)
      end
    end
  end
end
