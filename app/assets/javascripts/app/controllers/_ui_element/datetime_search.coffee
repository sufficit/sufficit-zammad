# coffeelint: disable=camel_case_classes
class App.UiElement.datetime_search
<<<<<<< HEAD
  @render: (attributeConfig, params) ->
=======
  @render: (attributeConfig) ->
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
    attribute = $.extend(true, {}, attributeConfig)

    attribute.disable_feature = true
    attribute.null = false
    App.UiElement.datetime.render(attribute)
