# coffeelint: disable=camel_case_classes
<<<<<<< HEAD
class App.UiElement.tree_select_search extends App.UiElement.ApplicationUiElement
  @render: (attributeConfig, params) ->
    attribute = $.extend(true, {}, attributeConfig)

    # set multiple option
    attribute.multiple = 'multiple'

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

  @sortOptions: (attribute, params) ->

    options = []

    @getSub(options, attribute.options, params)

    attribute.options = options

  @getSub: (options, localRow, params) ->
    for row in localRow
      length = row.value.split('::').length
      prefix = ''
      if length > 1
        for count in [2..length]
          prefix += '> '
      row.name = "#{prefix}#{row.name}"

      options.push row

      if row.children
        @getSub(options, row.children, params)
=======
class App.UiElement.tree_select_search extends App.UiElement.multi_tree_select
  @render: (attributeConfig, params) ->
    attributeConfig = $.extend(true, {}, attributeConfig)

    attributeConfig.multiple   = true
    attributeConfig.nulloption = true

    super
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
