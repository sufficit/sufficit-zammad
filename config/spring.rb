# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

Spring.watch(
  '.ruby-version',
  '.rbenv-vars',
  'tmp/restart.txt',
  'tmp/caching-dev.txt',
)

module Spring
  module Commands
    class BackgroundWorkerRb

      def call
        load ::Rails.root.join('script/background-worker.rb')
      end
    end

    Spring.register_command 'background-worker.rb', Spring::Commands::BackgroundWorkerRb.new
  end
end

module Spring
  module Commands
    class WebsocketServerRb

      def call
        load ::Rails.root.join('script/websocket-server.rb')
      end
    end

    Spring.register_command 'websocket-server.rb', Spring::Commands::WebsocketServerRb.new
  end
end

module Spring
  module Commands
    class RailsServer < Rails
      def command_name
        'server'
      end
    end

    Spring.register_command 'rails_server', RailsServer.new
  end
end
