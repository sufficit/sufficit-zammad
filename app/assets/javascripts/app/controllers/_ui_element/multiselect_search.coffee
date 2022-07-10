# coffeelint: disable=camel_case_classes
class App.UiElement.multiselect_search extends App.UiElement.ApplicationUiElement
  @render: (attributeConfig, params) ->
    attribute = $.extend(true, {}, attributeConfig)

    # set multiple option
<<<<<<< HEAD
    if attribute.multiple
      attribute.multiple = 'multiple'
    else
      attribute.multiple = ''
=======
    attribute.multiple = 'multiple'
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4

    delete attribute.filter

    # build options list based on config
    @getConfigOptionList(attribute, params)

    # build options list based on relation
    @getRelationOptionList(attribute, params)

    # add null selection if needed
    @addNullOption(attribute, params)

    # sort attribute.options
    @sortOptions(attribute, params)

    # find selected/checked item of list
    @selectedOptions(attribute, params)

    # disable item of list
    @disabledOptions(attribute, params)

    # filter attributes
    @filterOption(attribute, params)

    # return item
    $( App.view('generic/select')(attribute: attribute) )
