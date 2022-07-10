# coffeelint: disable=camel_case_classes
class App.UiElement.integer
<<<<<<< HEAD
  @render: (attributeConfig) ->
=======
  @render: (attributeConfig, params) ->
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
    attribute = $.extend(true, {}, attributeConfig)

    attribute.type = 'number'
    attribute.step = '1'
    item = $( App.view('generic/input')(attribute: attribute) )
    item.data('field-type', 'integer')
    item