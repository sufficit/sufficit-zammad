
// form
QUnit.test('form checks', assert => {

  // use unsorted order to check if the frontend is sorting correctly
  App.TicketPriority.refresh([
    {
      id:         2,
      name:       '2 normal',
      note:       'some note 2',
      active:     false,
      created_at: '2014-06-10T10:17:34.000Z',
    },
    {
      id:         3,
      name:       '3 high',
      note:       'some note 3',
      active:     true,
      created_at: '2014-06-10T10:17:44.000Z',
    },
    {
      id:         4,
      name:       '4 very high',
      note:       'some note 4',
      active:     true,
      created_at: '2014-06-10T10:17:54.000Z',
    },
    {
      id:         5,
      name:       '5 xxx very high',
      note:       'some note 5',
      active:     false,
      created_at: '2014-06-10T10:17:56.000Z',
    },
    {
      id:         1,
      name:       '1 low',
      note:       'some note 1',
      active:     true,
      created_at: '2014-06-10T11:17:34.000Z',
    },
  ])

  App.TicketState.refresh([
    {
      id:         1,
      name:       'new',
      note:       'some note 1',
      active:     true,
      created_at: '2014-06-10T11:17:34.000Z',
    },
    {
      id:         2,
      name:       'open',
      note:       'some note 2',
      active:     true,
      created_at: '2014-06-10T10:17:34.000Z',
    },
    {
      id:         3,
      name:       'should not be shown',
      note:       'some note 3',
      active:     false,
      created_at: '2014-06-10T10:17:34.000Z',
    },
  ])

  App.User.refresh([
    {
      id:         47,
      login:      'bod@example.com',
      email:      'bod@example.com',
      firstname:  'Bob',
      lastname:   'Smith',
      active:     true,
      created_at: '2014-06-10T11:17:34.000Z',
    },
  ])

  App.Organization.refresh([
    {
      id:         12,
      name:      'Org 1',
      active:     true,
      created_at: '2014-06-10T11:19:34.000Z',
    },
  ])

  App.ObjectManagerAttribute.refresh([{"name":"number","object":"Ticket","display":"#","active":true,"editable":false,"data_type":"input","data_option":{"type":"text","readonly":1,"null":true,"maxlength":60,"width":"68px"},"screens":{"create_top":{},"edit":{}},"position":5,"id":1},{"name":"title","object":"Ticket","display":"Title","active":true,"editable":false,"data_type":"input","data_option":{"type":"text","maxlength":200,"null":false,"translate":false},"screens":{"create_top":{"-all-":{"null":false}},"edit":{}},"position":8,"id":2},{"name":"customer_id","object":"Ticket","display":"Customer","active":true,"editable":false,"data_type":"user_autocompletion","data_option":{"relation":"User","autocapitalize":false,"multiple":false,"guess":true,"null":false,"limit":200,"placeholder":"Enter Person or Organization/Company","minLengt":2,"translate":false,"permission":["ticket.agent"]},"screens":{"create_top":{"-all-":{"null":false}},"edit":{}},"position":10,"id":3},{"name":"organization_id","object":"Ticket","display":"Organization","active":true,"editable":false,"data_type":"autocompletion_ajax","data_option":{"relation":"Organization","autocapitalize":false,"multiple":false,"null":true,"translate":false,"permission":["ticket.agent"],"readonly":1},"screens":{"create_top":{"-all-":{"null":false}},"edit":{}},"position":12,"id":4},{"name":"type","object":"Ticket","display":"Type","active":false,"editable":true,"data_type":"select","data_option":{"default":"","options":{"Incident":"Incident","Problem":"Problem","Request for Change":"Request for Change"},"nulloption":true,"multiple":false,"null":true,"translate":true,"maxlength":255},"screens":{"create_middle":{"-all-":{"null":false,"item_class":"column"}},"edit":{"ticket.agent":{"null":false}}},"position":20,"id":5},{"name":"group_id","object":"Ticket","display":"Group","active":true,"editable":false,"data_type":"select","data_option":{"default":"","relation":"Group","relation_condition":{"access":"full"},"nulloption":true,"multiple":false,"null":false,"translate":false,"only_shown_if_selectable":true,"permission":["ticket.agent","ticket.customer"],"maxlength":255},"screens":{"create_middle":{"-all-":{"null":false,"item_class":"column"}},"edit":{"ticket.agent":{"null":false}}},"position":25,"id":6},{"name":"owner_id","object":"Ticket","display":"Owner","active":true,"editable":false,"data_type":"select","data_option":{"default":"","relation":"User","relation_condition":{"roles":"Agent"},"nulloption":true,"multiple":false,"null":true,"translate":false,"permission":["ticket.agent"],"maxlength":255},"screens":{"create_middle":{"-all-":{"null":true,"item_class":"column"}},"edit":{"-all-":{"null":true}}},"position":30,"id":7},{"name":"state_id","object":"Ticket","display":"State","active":true,"editable":false,"data_type":"select","data_option":{"relation":"TicketState","nulloption":true,"multiple":false,"null":false,"default":2,"translate":true,"filter":[2,1,3,4,6,7],"maxlength":255},"screens":{"create_middle":{"ticket.agent":{"null":false,"item_class":"column","filter":[2,1,3,4,7]},"ticket.customer":{"item_class":"column","nulloption":false,"null":true,"filter":[1,4],"default":1}},"edit":{"ticket.agent":{"nulloption":false,"null":false,"filter":[2,3,4,7]},"ticket.customer":{"nulloption":false,"null":true,"filter":[2,4],"default":2}}},"position":40,"id":8},{"name":"pending_time","object":"Ticket","display":"Pending till","active":true,"editable":false,"data_type":"datetime","data_option":{"future":true,"past":false,"diff":24,"null":true,"translate":true,"permission":["ticket.agent"]},"screens":{"create_middle":{"-all-":{"null":false,"item_class":"column"}},"edit":{"-all-":{"null":false}}},"position":41,"id":9},{"name":"priority_id","object":"Ticket","display":"Priority","active":true,"editable":false,"data_type":"select","data_option":{"relation":"TicketPriority","nulloption":false,"multiple":false,"null":false,"default":2,"translate":true,"maxlength":255},"screens":{"create_middle":{"ticket.agent":{"null":false,"item_class":"column"}},"edit":{"ticket.agent":{"null":false}}},"position":80,"id":10},{"name":"login","object":"User","display":"Login","active":true,"editable":false,"data_type":"input","data_option":{"type":"text","maxlength":100,"null":true,"autocapitalize":false,"item_class":"formGroup--halfSize"},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{},"view":{"-all-":{"shown":false}}},"position":100,"id":17},{"name":"type_id","object":"TicketArticle","display":"Type","active":true,"editable":false,"data_type":"select","data_option":{"relation":"TicketArticleType","nulloption":false,"multiple":false,"null":false,"default":10,"translate":true,"maxlength":255},"screens":{"create_middle":{},"edit":{"ticket.agent":{"null":false}}},"position":100,"id":12},{"name":"firstname","object":"User","display":"First name","active":true,"editable":false,"data_type":"input","data_option":{"type":"text","maxlength":150,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{"-all-":{"null":true}},"invite_agent":{"-all-":{"null":true}},"invite_customer":{"-all-":{"null":true}},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":200,"id":18},{"name":"internal","object":"TicketArticle","display":"Visibility","active":true,"editable":false,"data_type":"select","data_option":{"options":{"true":"internal","false":"public"},"nulloption":false,"multiple":false,"null":true,"default":false,"translate":true,"maxlength":255},"screens":{"create_middle":{},"edit":{"ticket.agent":{"null":false}}},"position":200,"id":13},{"name":"name","object":"Organization","display":"Name","active":true,"editable":false,"data_type":"input","data_option":{"type":"text","maxlength":150,"null":false,"item_class":"formGroup--halfSize"},"screens":{"edit":{"-all-":{"null":false}},"create":{"-all-":{"null":false}},"view":{"-all-":{"shown":true}}},"position":200,"id":37},{"name":"name","object":"Group","display":"Name","active":true,"editable":false,"data_type":"input","data_option":{"type":"text","maxlength":150,"null":false},"screens":{"create":{"-all-":{"null":false}},"edit":{"-all-":{"null":false}},"view":{"-all-":{"shown":true}}},"position":200,"id":43},{"name":"assignment_timeout","object":"Group","display":"Assignment Timeout","active":true,"editable":false,"data_type":"integer","data_option":{"maxlength":150,"null":true,"note":"Assignment timeout in minutes if assigned agent is not working on it. Ticket will be shown as unassigend.","min":0,"max":999999},"screens":{"create":{"-all-":{"null":true}},"edit":{"-all-":{"null":true}}},"position":300,"id":44},{"name":"lastname","object":"User","display":"Last name","active":true,"editable":false,"data_type":"input","data_option":{"type":"text","maxlength":150,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{"-all-":{"null":true}},"invite_agent":{"-all-":{"null":true}},"invite_customer":{"-all-":{"null":true}},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":300,"id":19},{"name":"to","object":"TicketArticle","display":"To","active":true,"editable":false,"data_type":"input","data_option":{"type":"text","maxlength":1000,"null":true},"screens":{"create_middle":{},"edit":{"ticket.agent":{"null":true}}},"position":300,"id":14},{"name":"cc","object":"TicketArticle","display":"CC","active":true,"editable":false,"data_type":"input","data_option":{"type":"text","maxlength":1000,"null":true},"screens":{"create_top":{},"create_middle":{},"edit":{"ticket.agent":{"null":true}}},"position":400,"id":15},{"name":"email","object":"User","display":"Email","active":true,"editable":false,"data_type":"input","data_option":{"type":"email","maxlength":150,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{"-all-":{"null":true}},"invite_agent":{"-all-":{"null":true}},"invite_customer":{"-all-":{"null":true}},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":400,"id":20},{"name":"follow_up_possible","object":"Group","display":"Follow-up possible","active":true,"editable":false,"data_type":"select","data_option":{"default":"yes","options":{"yes":"yes","new_ticket":"do not reopen Ticket but create new Ticket"},"null":false,"note":"Follow-up for closed ticket possible or not.","translate":true,"nulloption":true,"maxlength":255},"screens":{"create":{"-all-":{"null":false}},"edit":{"-all-":{"null":false}}},"position":400,"id":45},{"name":"follow_up_assignment","object":"Group","display":"Assign Follow-Ups","active":true,"editable":false,"data_type":"select","data_option":{"default":"true","options":{"true":"yes","false":"no"},"null":false,"note":"Assign follow-up to latest agent again.","translate":true,"nulloption":true,"maxlength":255},"screens":{"create":{"-all-":{"null":false}},"edit":{"-all-":{"null":false}}},"position":500,"id":46},{"name":"web","object":"User","display":"Web","active":true,"editable":false,"data_type":"input","data_option":{"type":"url","maxlength":250,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":500,"id":21},{"name":"body","object":"TicketArticle","display":"Text","active":true,"editable":false,"data_type":"richtext","data_option":{"type":"richtext","maxlength":150000,"upload":true,"rows":8,"null":true},"screens":{"create_top":{"-all-":{"null":false}},"edit":{"-all-":{"null":true}}},"position":600,"id":16},{"name":"email_address_id","object":"Group","display":"Email","active":true,"editable":false,"data_type":"select","data_option":{"default":"","multiple":false,"null":true,"relation":"EmailAddress","nulloption":true,"do_not_log":true,"maxlength":255},"screens":{"create":{"-all-":{"null":true}},"edit":{"-all-":{"null":true}}},"position":600,"id":47},{"name":"phone","object":"User","display":"Phone","active":true,"editable":false,"data_type":"input","data_option":{"type":"tel","maxlength":100,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":600,"id":22},{"name":"signature_id","object":"Group","display":"Signature","active":true,"editable":false,"data_type":"select","data_option":{"default":"","multiple":false,"null":true,"relation":"Signature","nulloption":true,"do_not_log":true,"maxlength":255},"screens":{"create":{"-all-":{"null":true}},"edit":{"-all-":{"null":true}}},"position":600,"id":48},{"name":"mobile","object":"User","display":"Mobile","active":true,"editable":false,"data_type":"input","data_option":{"type":"tel","maxlength":100,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":700,"id":23},{"name":"fax","object":"User","display":"Fax","active":true,"editable":false,"data_type":"input","data_option":{"type":"tel","maxlength":100,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":800,"id":24},{"name":"organization_id","object":"User","display":"Organization","active":true,"editable":false,"data_type":"autocompletion_ajax","data_option":{"multiple":false,"nulloption":true,"null":true,"relation":"Organization","item_class":"formGroup--halfSize"},"screens":{"signup":{},"invite_agent":{},"invite_customer":{"-all-":{"null":true}},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":900,"id":25},{"name":"tags","object":"Ticket","display":"Tags","active":true,"editable":false,"data_type":"tag","data_option":{"type":"text","null":true,"translate":false},"screens":{"create_bottom":{"ticket.agent":{"null":true}},"edit":{}},"position":900,"id":11},{"name":"department","object":"User","display":"Department","active":true,"editable":true,"data_type":"input","data_option":{"type":"text","maxlength":200,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":1000,"id":26},{"name":"street","object":"User","display":"Street","active":false,"editable":true,"data_type":"input","data_option":{"type":"text","maxlength":100,"null":true},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":1100,"id":27},{"name":"zip","object":"User","display":"Zip","active":false,"editable":true,"data_type":"input","data_option":{"type":"text","maxlength":100,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":1200,"id":28},{"name":"city","object":"User","display":"City","active":false,"editable":true,"data_type":"input","data_option":{"type":"text","maxlength":100,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":1300,"id":29},{"name":"country","object":"User","display":"Country","active":false,"editable":true,"data_type":"input","data_option":{"type":"text","maxlength":100,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":1325,"id":30},{"name":"address","object":"User","display":"Address","active":true,"editable":true,"data_type":"textarea","data_option":{"type":"text","maxlength":500,"null":true,"item_class":"formGroup--halfSize"},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":1350,"id":31},{"name":"password","object":"User","display":"Password","active":true,"editable":false,"data_type":"input","data_option":{"type":"password","maxlength":100,"null":true,"autocomplete":"new-password","item_class":"formGroup--halfSize"},"screens":{"signup":{"-all-":{"null":false}},"invite_agent":{},"invite_customer":{},"edit":{"admin.user":{"null":true}},"create":{"-all-":{"null":true}},"view":{}},"position":1400,"id":32},{"name":"shared","object":"Organization","display":"Shared organization","active":true,"editable":false,"data_type":"boolean","data_option":{"null":true,"default":true,"note":"Customers in the organization can view each other's items.","item_class":"formGroup--halfSize","options":{"true":"yes","false":"no"},"translate":true,"permission":["admin.organization"]},"screens":{"edit":{"-all-":{"null":false}},"create":{"-all-":{"null":false}},"view":{"-all-":{"shown":true}}},"position":1400,"id":38},{"name":"shared_drafts","object":"Group","display":"Shared Drafts","active":true,"editable":true,"data_type":"active","data_option":{"null":false,"default":true,"permission":["admin.group"]},"screens":{"create":{"-all-":{"null":true}},"edit":{"-all-":{"null":false}},"view":{"-all-":{"shown":false}}},"position":1400,"id":49},{"name":"domain_assignment","object":"Organization","display":"Domain based assignment","active":true,"editable":false,"data_type":"boolean","data_option":{"null":true,"default":false,"note":"Assign users based on user domain.","item_class":"formGroup--halfSize","options":{"true":"yes","false":"no"},"translate":true,"permission":["admin.organization"]},"screens":{"edit":{"-all-":{"null":false}},"create":{"-all-":{"null":false}},"view":{"-all-":{"shown":true}}},"position":1410,"id":39},{"name":"domain","object":"Organization","display":"Domain","active":true,"editable":false,"data_type":"input","data_option":{"type":"text","maxlength":150,"null":true,"item_class":"formGroup--halfSize"},"screens":{"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":1420,"id":40},{"name":"vip","object":"User","display":"VIP","active":true,"editable":false,"data_type":"boolean","data_option":{"null":true,"default":false,"item_class":"formGroup--halfSize","options":{"false":"no","true":"yes"},"translate":true,"permission":["admin.user","ticket.agent"]},"screens":{"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":false}}},"position":1490,"id":33},{"name":"note","object":"Organization","display":"Note","active":true,"editable":false,"data_type":"richtext","data_option":{"type":"text","maxlength":5000,"null":true,"note":"Notes are visible to agents only, never to customers."},"screens":{"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":1500,"id":41},{"name":"note","object":"User","display":"Note","active":true,"editable":false,"data_type":"richtext","data_option":{"type":"text","maxlength":5000,"null":true,"note":"Notes are visible to agents only, never to customers."},"screens":{"signup":{},"invite_agent":{},"invite_customer":{"-all-":{"null":true}},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":1500,"id":34},{"name":"note","object":"Group","display":"Note","active":true,"editable":false,"data_type":"richtext","data_option":{"type":"text","maxlength":250,"null":true,"note":"Notes are visible to agents only, never to customers."},"screens":{"create":{"-all-":{"null":true}},"edit":{"-all-":{"null":true}},"view":{"-all-":{"shown":true}}},"position":1500,"id":50},{"name":"role_ids","object":"User","display":"Permissions","active":true,"editable":false,"data_type":"user_permission","data_option":{"null":false,"item_class":"checkbox","permission":["admin.user"]},"screens":{"signup":{},"invite_agent":{"-all-":{"null":false,"default":[2]}},"invite_customer":{},"edit":{"-all-":{"null":true}},"create":{"-all-":{"null":true}},"view":{"-all-":{"shown":false}}},"position":1600,"id":35},{"name":"active","object":"Group","display":"Active","active":true,"editable":false,"data_type":"active","data_option":{"null":true,"default":true,"permission":["admin.group"]},"screens":{"create":{"-all-":{"null":true}},"edit":{"-all-":{"null":false}},"view":{"-all-":{"shown":false}}},"position":1800,"id":51},{"name":"active","object":"User","display":"Active","active":true,"editable":false,"data_type":"active","data_option":{"null":true,"default":true,"permission":["admin.user","ticket.agent"]},"screens":{"signup":{},"invite_agent":{},"invite_customer":{},"edit":{"-all-":{"null":false}},"create":{"-all-":{"null":false}},"view":{"-all-":{"shown":false}}},"position":1800,"id":36},{"name":"active","object":"Organization","display":"Active","active":true,"editable":false,"data_type":"active","data_option":{"null":true,"default":true,"permission":["admin.organization"]},"screens":{"edit":{"-all-":{"null":false}},"create":{"-all-":{"null":false}},"view":{"-all-":{"shown":false}}},"position":1800,"id":42}])

  /* working hours and escalation_times */
  $('#forms').append('<hr><h1>form condition check #1</h1><form id="form1"></form>')
  var el = $('#form1')
  var defaults = {
    priority1_id: '1',
    priority2_id: ['1', '2'],
    priority3_id: '2',
    priority4_id: '2',
    priority5_id: '1',
    working_hours: {
      mon: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      tue: {
        active: true,
        timeframes: [
          ['00:00','22:00']
        ]
      },
      wed: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      thu: {
        active: true,
        timeframes: [
          ['09:00','12:00'],
          ['13:00','17:00']
        ]
      },
      fri: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      sat: {
        active: false,
        timeframes: [
          ['10:00','14:00']
        ]
      },
      sun: {
        active: false,
        timeframes: [
          ['10:00','14:00']
        ]
      },
    },
    first_response_time: 150,
    solution_time: '',
    update_time: 45,
  }
  new App.ControllerForm({
    el:        el,
    model:     {
      configure_attributes: [
        { name: 'priority1_id', display: 'Priroity1 (with active selection)', tag: 'select', relation: 'TicketPriority', null: true, options: {} },
        { name: 'priority2_id', display: 'Priroity2 (with active and inactive selection)', tag: 'select', multiple: true, relation: 'TicketPriority', null: true, options: {} },
        { name: 'priority3_id', display: 'Priroity3 (with inactive selection)', tag: 'select', relation: 'TicketPriority', null: true, options: {} },
        { name: 'priority4_id', display: 'Priroity4 (with inactive selection)', tag: 'select', multiple: true, relation: 'TicketPriority', null: true, options: {} },
        { name: 'priority5_id', display: 'Priroity5 (with active selection)', tag: 'select', multiple: true, relation: 'TicketPriority', null: true, options: {} },
        { name: 'escalation_times', display: 'Times', tag: 'sla_times', null: true },
        { name: 'working_hours',    display: 'Hours', tag: 'business_hours', null: true },
      ]
    },
    params: defaults,
    autofocus: true
  })
  var params = App.ControllerForm.params(el)
  var test_params = {
    priority1_id: '1',
    priority2_id: ['1', '2'],
    priority3_id: '2',
    priority4_id: ['2'],
    priority5_id: ['1'],
    first_response_time: '150',
    first_response_time_enabled: 'on',
    first_response_time_in_text: '02:30',
    response_time: '',
    response_time_in_text: '',
    solution_time: '',
    solution_time_enabled: undefined,
    solution_time_in_text: '',
    update_time: '45',
    update_time_enabled: 'on',
    update_time_in_text: '00:45',
    update_type: 'update',
    working_hours: {
      mon: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      tue: {
        active: true,
        timeframes: [
          ['00:00','22:00']
        ]
      },
      wed: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      thu: {
        active: true,
        timeframes: [
          ['09:00','12:00'],
          ['13:00','17:00']
        ]
      },
      fri: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      sat: {
        active: false,
        timeframes: [
          ['10:00','14:00']
        ]
      },
      sun: {
        active: false,
        timeframes: [
          ['10:00','14:00']
        ]
      },
    },
  }
  assert.deepEqual(params, test_params, 'form param check #1')

  // check possible options
  assert.equal(el.find('[name="priority1_id"] option').length, 3)
  assert.equal(el.find('[name="priority2_id"] option').length, 4)
  assert.equal(el.find('[name="priority3_id"] option').length, 4)
  assert.equal(el.find('[name="priority4_id"] option').length, 4)
  assert.equal(el.find('[name="priority5_id"] option').length, 3)

  // check priority1_id selection order
  assert.equal(el.find('[name="priority1_id"] option:nth-child(1)').text(), '1 low')
  assert.equal(el.find('[name="priority1_id"] option:nth-child(2)').text(), '3 high')
  assert.equal(el.find('[name="priority1_id"] option:nth-child(3)').text(), '4 very high')

  // check priority2_id selection order
  assert.equal(el.find('[name="priority2_id"] option:nth-child(1)').text(), '1 low')
  assert.equal(el.find('[name="priority2_id"] option:nth-child(2)').text(), '2 normal')
  assert.equal(el.find('[name="priority2_id"] option:nth-child(3)').text(), '3 high')
  assert.equal(el.find('[name="priority2_id"] option:nth-child(4)').text(), '4 very high')

  // check priority3_id selection order
  assert.equal(el.find('[name="priority3_id"] option:nth-child(1)').text(), '1 low')
  assert.equal(el.find('[name="priority3_id"] option:nth-child(2)').text(), '2 normal')
  assert.equal(el.find('[name="priority3_id"] option:nth-child(3)').text(), '3 high')
  assert.equal(el.find('[name="priority3_id"] option:nth-child(4)').text(), '4 very high')

  // check priority4_id selection order
  assert.equal(el.find('[name="priority4_id"] option:nth-child(1)').text(), '1 low')
  assert.equal(el.find('[name="priority4_id"] option:nth-child(2)').text(), '2 normal')
  assert.equal(el.find('[name="priority4_id"] option:nth-child(3)').text(), '3 high')
  assert.equal(el.find('[name="priority4_id"] option:nth-child(4)').text(), '4 very high')

  // check priority5_id selection order
  assert.equal(el.find('[name="priority5_id"] option:nth-child(1)').text(), '1 low')
  assert.equal(el.find('[name="priority5_id"] option:nth-child(2)').text(), '3 high')
  assert.equal(el.find('[name="priority5_id"] option:nth-child(3)').text(), '4 very high')

  // change sla times
  el.find('[name="first_response_time_in_text"]').val('0:30').trigger('blur')
  el.find('#update_time').trigger('click')

  var params = App.ControllerForm.params(el)
  var test_params = {
    priority1_id: '1',
    priority2_id: ['1', '2'],
    priority3_id: '2',
    priority4_id: ['2'],
    priority5_id: ['1'],
    working_hours: {
      mon: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      tue: {
        active: true,
        timeframes: [
          ['00:00','22:00']
        ]
      },
      wed: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      thu: {
        active: true,
        timeframes: [
          ['09:00','12:00'],
          ['13:00','17:00']
        ]
      },
      fri: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      sat: {
        active: false,
        timeframes: [
          ['10:00','14:00']
        ]
      },
      sun: {
        active: false,
        timeframes: [
          ['10:00','14:00']
        ]
      },
    },
    first_response_time: '30',
    first_response_time_enabled: 'on',
    first_response_time_in_text: '00:30',
    response_time: '',
    response_time_in_text: '',
    solution_time: '',
    solution_time_enabled: undefined,
    solution_time_in_text: '',
    update_time: '',
    update_time_enabled: undefined,
    update_time_in_text: '',
    update_type: undefined,
  }
  assert.deepEqual(params, test_params, 'form param check')

  // change sla times
  el.find('#update_time').attr('checked', false)
  el.find('[value=response]').trigger('click')
  el.find('[name="response_time_in_text"]').val('4:30').trigger('blur')

  var params = App.ControllerForm.params(el)
  var test_params = {
    priority1_id: '1',
    priority2_id: ['1', '2'],
    priority3_id: '2',
    priority4_id: ['2'],
    priority5_id: ['1'],
    working_hours: {
      mon: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      tue: {
        active: true,
        timeframes: [
          ['00:00','22:00']
        ]
      },
      wed: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      thu: {
        active: true,
        timeframes: [
          ['09:00','12:00'],
          ['13:00','17:00']
        ]
      },
      fri: {
        active: true,
        timeframes: [
          ['09:00','17:00']
        ]
      },
      sat: {
        active: false,
        timeframes: [
          ['10:00','14:00']
        ]
      },
      sun: {
        active: false,
        timeframes: [
          ['10:00','14:00']
        ]
      },
    },
    first_response_time: '30',
    first_response_time_enabled: 'on',
    first_response_time_in_text: '00:30',
    response_time: '270',
    response_time_in_text: '04:30',
    solution_time: '',
    solution_time_enabled: undefined,
    solution_time_in_text: '',
    update_time: '',
    update_time_enabled: 'on',
    update_time_in_text: '',
    update_type: 'response'
  }
  assert.deepEqual(params, test_params, 'form param check post response')

  /* empty params or defaults */
  $('#forms').append('<hr><h1>form condition check #2</h1><form id="form2"></form>')
  var el = $('#form2')
  new App.ControllerForm({
    el:    el,
    model: {
      configure_attributes: [
        { name: 'condition',  display: 'Conditions', tag: 'ticket_selector', null: true },
        { name: 'executions', display: 'Executions', tag: 'ticket_perform_action', null: true, notification: true },
      ]
    },
    autofocus: true
  })
  var params = App.ControllerForm.params(el)
  var test_params = {
    condition: {
      'ticket.state_id': {
        operator: 'is',
        value: null,
      },
    },
    executions: {
      'ticket.state_id': {
        value: "1",
      },
    },
  }
  assert.deepEqual(params, test_params, 'form param check #2');

  /* with params or defaults */
  $('#forms').append('<hr><h1>form 3</h1><form id="form3"></form>')
  var el = $('#form3')
  var defaults = {
    condition: {
      'ticket.title': {
        operator: 'contains',
        value: 'some title',
      },
      'ticket.priority_id': {
        operator: 'is',
        value: [1,2,3],
      },
      'ticket.created_at': {
        operator: 'before (absolute)',
        value: '2015-09-20T03:41:00.000Z',
      },
      'ticket.updated_at': {
        operator: 'within last (relative)',
        range: 'year',
        value: 2,
      },
      'ticket.organization_id': {
        operator: 'is not',
        pre_condition: 'specific',
        value: 12,
      },
      'ticket.owner_id': {
        operator: 'is',
        pre_condition: 'specific',
        value: 47,
      },
      'ticket.created_by_id': {
        operator: 'is',
        pre_condition: 'current_user.id',
        value: '',
      },
    },
    executions: {
      'ticket.title': {
        value: 'some title new',
      },
      'ticket.priority_id': {
        value: 3,
      },
      'ticket.owner_id': {
        pre_condition: 'specific',
        value: 47,
      },
      'ticket.tags': {
        operator: 'remove',
        value: 'tag1, tag2',
      },
      'notification.email': {
        recipient: 'ticket_customer',
        subject: 'some subject',
        body: "some<br>\nbody",
        internal: 'false',
        include_attachments: 'false',
      },
    },
  }
  new App.ControllerForm({
    el:        el,
    model:     {
      configure_attributes: [
        { name: 'condition',  display: 'Conditions', tag: 'ticket_selector', null: true },
        { name: 'executions', display: 'Executions', tag: 'ticket_perform_action', null: true, notification: true },
      ]
    },
    params: defaults,
    autofocus: true
  })
  var params = App.ControllerForm.params(el)
  var test_params = {
    condition: {
      'ticket.title': {
        operator: 'contains',
        value: 'some title',
      },
      'ticket.priority_id': {
        operator: 'is',
        value: ['1', '2', '3'], // show also invalid proirity, because it's selected
      },
      'ticket.created_at': {
        operator: 'before (absolute)',
        value: '2015-09-20T03:41:00.000Z',
      },
      'ticket.updated_at': {
        operator: 'within last (relative)',
        range: 'year',
        value: '2',
      },
      'ticket.organization_id': {
        operator: 'is not',
        pre_condition: 'specific',
        value: ['12'],
        value_completion: '',
      },
      'ticket.owner_id': {
        operator: 'is',
        pre_condition: 'specific',
        value: ['47'],
        value_completion: '',
      },
      'ticket.created_by_id': {
        operator: 'is',
        pre_condition: 'current_user.id',
        value: null,
        value_completion: ''
      },
    },
    executions: {
      'ticket.title': {
        value: 'some title new',
      },
      'ticket.owner_id': {
        pre_condition: 'specific',
        value: '47',
        value_completion: "Bob Smith <bod@example.com>"
      },
      'ticket.priority_id': {
        value: '3',
      },
      'ticket.tags': {
        operator: 'remove',
        value: 'tag1, tag2',
      },
      'notification.email': {
        recipient: ['ticket_customer'],
        subject: 'some subject',
        body: "some<br>\nbody",
        internal: 'false',
        include_attachments: 'false',
      },
    },
  }
  assert.deepEqual(params, test_params, 'form param check')

  // change selector
  el.find('[name="condition::ticket.priority_id::value"]').closest('.js-filterElement').find('.js-remove').trigger('click')
  el.find('[name="executions::ticket.title::value"]').closest('.js-filterElement').find('.js-remove').trigger('click')

  var params = App.ControllerForm.params(el)
  var test_params = {
    condition: {
      'ticket.title': {
        operator: 'contains',
        value: 'some title',
      },
      'ticket.created_at': {
        operator: 'before (absolute)',
        value: '2015-09-20T03:41:00.000Z',
      },
      'ticket.updated_at': {
        operator: 'within last (relative)',
        range: 'year',
        value: '2',
      },
      'ticket.organization_id': {
        operator: 'is not',
        pre_condition: 'specific',
        value: ['12'],
        value_completion: '',
      },
      'ticket.owner_id': {
        operator: 'is',
        pre_condition: 'specific',
        value: ['47'],
        value_completion: '',
      },
      'ticket.created_by_id': {
        operator: 'is',
        pre_condition: 'current_user.id',
        value: null,
        value_completion: ''
      },
    },
    executions: {
      'ticket.priority_id': {
        value: '3',
      },
      'ticket.owner_id': {
        pre_condition: 'specific',
        value: '47',
        value_completion: "Bob Smith <bod@example.com>"
      },
      'ticket.tags': {
        operator: 'remove',
        value: 'tag1, tag2',
      },
      'notification.email': {
        recipient: ['ticket_customer'],
        subject: 'some subject',
        body: "some<br>\nbody",
        internal: 'false',
        include_attachments: 'false',
      },
    },
  }
  assert.deepEqual(params, test_params, 'form param check')

  // change selector
  el.find('[name="executions::notification.email::subject"]').closest('.js-filterElement').find('.js-remove').trigger('click')

  var params = App.ControllerForm.params(el)
  var test_params = {
    condition: {
      'ticket.title': {
        operator: 'contains',
        value: 'some title',
      },
      'ticket.created_at': {
        operator: 'before (absolute)',
        value: '2015-09-20T03:41:00.000Z',
      },
      'ticket.updated_at': {
        operator: 'within last (relative)',
        range: 'year',
        value: '2',
      },
      'ticket.organization_id': {
        operator: 'is not',
        pre_condition: 'specific',
        value: ['12'],
        value_completion: '',
      },
      'ticket.owner_id': {
        operator: 'is',
        pre_condition: 'specific',
        value: ['47'],
        value_completion: '',
      },
      'ticket.created_by_id': {
        operator: 'is',
        pre_condition: 'current_user.id',
        value: null,
        value_completion: ''
      },
    },
    executions: {
      'ticket.priority_id': {
        value: '3',
      },
      'ticket.owner_id': {
        pre_condition: 'specific',
        value: '47',
        value_completion: "Bob Smith <bod@example.com>"
      },
      'ticket.tags': {
        operator: 'remove',
        value: 'tag1, tag2',
      },
    },
  }
  assert.deepEqual(params, test_params, 'form param check')

  // change selector
  el.find('.js-attributeSelector').last().find('select').val('notification.email').trigger('change')
  el.find('[name="executions::notification.email::subject"]').val('some subject')
  el.find('[data-name="executions::notification.email::body"]').html('lala')
  el.find('[data-name="executions::notification.email::recipient"] .js-select.js-option[data-value="ticket_owner"]').trigger('click')

  var params = App.ControllerForm.params(el)
  var test_params = {
    condition: {
      'ticket.title': {
        operator: 'contains',
        value: 'some title',
      },
      'ticket.created_at': {
        operator: 'before (absolute)',
        value: '2015-09-20T03:41:00.000Z',
      },
      'ticket.updated_at': {
        operator: 'within last (relative)',
        range: 'year',
        value: '2',
      },
      'ticket.organization_id': {
        operator: 'is not',
        pre_condition: 'specific',
        value: ['12'],
        value_completion: '',
      },
      'ticket.owner_id': {
        operator: 'is',
        pre_condition: 'specific',
        value: ['47'],
        value_completion: '',
      },
      'ticket.created_by_id': {
        operator: 'is',
        pre_condition: 'current_user.id',
        value: null,
        value_completion: ''
      },
    },
    executions: {
      'ticket.priority_id': {
        value: '3',
      },
      'ticket.owner_id': {
        pre_condition: 'specific',
        value: '47',
        value_completion: "Bob Smith <bod@example.com>"
      },
      'notification.email': {
        recipient: ['ticket_owner'],
        subject: 'some subject',
        body: 'lala',
        internal: 'false',
        include_attachments: 'false',
      },
    },
  }
  assert.deepEqual(params, test_params, 'form param check')

  /* with params or defaults */
  $('#forms').append('<hr><h1>form 4</h1><form id="form4"></form>')
  var el = $('#form4')
  var defaults = {
    condition: {
      'ticket.title': {
        operator: 'contains',
        value: 'some title',
      },
    },
    executions: {
      'notification.email': {
        recipient: 'ticket_customer',
        subject: 'some subject',
        body: "some<br>\nbody",
        internal: 'false',
        include_attachments: 'false',
      },
    },
  }
  new App.ControllerForm({
    el:        el,
    model:     {
      configure_attributes: [
        { name: 'condition',  display: 'Conditions', tag: 'ticket_selector', null: true },
        { name: 'executions', display: 'Executions', tag: 'ticket_perform_action', null: true, notification: true },
      ]
    },
    params: defaults,
    autofocus: true
  })
  var params = App.ControllerForm.params(el)
  var test_params = {
    condition: {
      'ticket.title': {
        operator: 'contains',
        value: 'some title',
      },
    },
    executions: {

      'notification.email': {
        recipient: ['ticket_customer'],
        subject: 'some subject',
        body: "some<br>\nbody",
        internal: 'false',
        include_attachments: 'false',
      },
    },
  }
  assert.deepEqual(params, test_params, 'form param check')

  $('#forms').append('<hr><h1>form 5</h1><form id="form5"></form>')
  var el = $('#form5')
  var defaults = {
    condition: {
      'article.body': {
        operator: 'contains',
        value: 'some body',
      },
    },
    executions: {
      'notification.email': {
        recipient: 'ticket_customer',
        subject: 'some subject',
        body: "some<br>\nbody",
        internal: 'false',
        include_attachments: 'true',
      },
    },
  }
  new App.ControllerForm({
    el:        el,
    model:     {
      configure_attributes: [
        { name: 'condition',  display: 'Conditions', tag: 'ticket_selector', null: true },
        { name: 'executions', display: 'Executions', tag: 'ticket_perform_action', null: true, notification: true },
      ]
    },
    params: defaults,
    autofocus: true
  })
  var params = App.ControllerForm.params(el)
  var test_params = {
    condition: {
      'article.body': {
        operator: 'contains',
        value: 'some body',
      },
    },
    executions: {
      'notification.email': {
        recipient: ['ticket_customer'],
        subject: 'some subject',
        body: "some<br>\nbody",
        internal: 'false',
        include_attachments: 'true',
      },
    },
  }
  assert.deepEqual(params, test_params, 'form article body param check')

  App.User.refresh([
    {
      id:         44,
      login:      'bod@example.com',
      email:      'bod@example.com',
      firstname:  'Bob',
      lastname:   'Smith',
      active:     true,
      created_at: '2014-06-10T11:17:34.000Z',
    },
    {
      id:         45,
      login:      'john@example.com',
      email:      'john@example.com',
      firstname:  'John',
      lastname:   'Doe',
      active:     true,
      created_at: '2014-07-10T11:17:34.000Z',
    },
    {
      id:         46,
      login:      'sam@example.com',
      email:      'sam@example.com',
      firstname:  'Sam',
      lastname:   'Bond',
      active:     true,
      created_at: '2014-08-10T11:17:34.000Z',
    },
    {
      id:         30,
      login:      'clark@example.com',
      email:      'clark@example.com',
      firstname:  'Clark',
      lastname:   'Olsen',
      active:     true,
      created_at: '2016-02-10T11:17:34.000Z',
    },
    {
      id:         31,
      login:      'james@example.com',
      email:      'james@example.com',
      firstname:  'James',
      lastname:   'Puth',
      active:     true,
      created_at: '2016-03-10T11:17:34.000Z',
    },
    {
      id:         32,
      login:      'charles@example.com',
      email:      'charles@example.com',
      firstname:  'Charles',
      lastname:   'Kent',
      active:     true,
      created_at: '2016-04-10T11:17:34.000Z',
    },
  ])

  App.Organization.refresh([
    {
      id:         9,
      name:      'Org 1',
      active:     true,
      created_at: '2018-06-10T11:19:34.000Z',
    },
    {
      id:         10,
      name:      'Org 2',
      active:     true,
      created_at: '2018-06-10T11:19:34.000Z',
    },
    {
      id:         11,
      name:      'Org 3',
      active:     true,
      created_at: '2018-06-10T11:19:34.000Z',
    },
  ])

  /* with params or defaults */
  $('#forms').append('<hr><h1>form condition check for multiple user and organisation selection</h1><form id="form6"></form>')
  var el = $('#form6')
  var defaults = {
    condition: {
      'ticket.title': {
        operator: 'contains',
        value: 'some title',
      },
      'ticket.organization_id': {
        operator: 'is',
        pre_condition: 'specific',
        value: [9, 10, 11],
      },
      'ticket.owner_id': {
        operator: 'is not',
        pre_condition: 'specific',
        value: [44, 45, 46],
      },
      'ticket.customer_id': {
        operator: 'is',
        pre_condition: 'specific',
        value: [30, 31, 32],
      },
    },
    executions: {
      'ticket.title': {
        value: 'some title new',
      },
      'ticket.owner_id': {
        pre_condition: 'specific',
        value: 44,
      },
    },
  }
  new App.ControllerForm({
    el:        el,
    model:     {
      configure_attributes: [
        { name: 'condition',  display: 'Conditions', tag: 'ticket_selector', null: true },
        { name: 'executions', display: 'Executions', tag: 'ticket_perform_action', null: true, notification: true },
      ]
    },
    params: defaults,
    autofocus: true
  })
  var params = App.ControllerForm.params(el)
  var test_params = {
    condition: {
      'ticket.title': {
        operator: 'contains',
        value: 'some title',
      },
      'ticket.organization_id': {
        operator: 'is',
        pre_condition: 'specific',
        value: ['9', '10', '11'],
        value_completion: ''
      },
      'ticket.owner_id': {
        operator: 'is not',
        pre_condition: 'specific',
        value: ['44', '45', '46'],
        value_completion: ''
      },
      'ticket.customer_id': {
        operator: 'is',
        pre_condition: 'specific',
        value: ['30', '31', '32'],
        value_completion: ''
      },
    },
    executions: {
      'ticket.title': {
        value: 'some title new',
      },
      'ticket.owner_id': {
        pre_condition: 'specific',
        value: '44',
        value_completion: "Bob Smith <bod@example.com>"
      },
    },
  }
  assert.deepEqual(params, test_params, 'form param condition check for multiple users and organisation')

  // https://github.com/zammad/zammad/issues/4153
  $('#forms').append('<hr><h1>Trigger Attribute "action > is > updated" is not working after Zammad 5.2 update #4153</h1><form id="form7"></form>')
  var el = $('#form7')
  var defaults = {
    condition: {
      'ticket.action': {
        operator: 'is',
        value: 'update',
      },
      'ticket.state_id': {
        operator: 'is',
        pre_condition: 'specific',
        value: [1],
      },
    },
  }
  new App.ControllerForm({
    el:        el,
    model:     {
      configure_attributes: [
        { name: 'condition',  display: 'Conditions', tag: 'ticket_selector', null: true, action: true },
      ]
    },
    params: defaults,
    autofocus: true
  })
  assert.equal(undefined, $("#form7 select[name='condition::ticket.action::value']").attr('multiple'), 'ticket action is not multiple')
  assert.equal('multiple', $("#form7  select[name='condition::ticket.state_id::value']").attr('multiple'), 'state id is multiple')
});
