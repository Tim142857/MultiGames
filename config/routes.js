module.exports.routes = {
  '/': {
    view: 'homepage'
  },

  'get /login': {
    view: 'login'
  },

  'post /login': 'AuthController.login',

  '/logout': 'AuthController.logout',

  'get /signup': {
    view: 'signup'
  },

  '/send-message': 'ChatController.sendMessage',

  '/new-chatter': 'ChatController.newChatter',

  '/check-new-record': 'ArrowsController.checkNewRecord',

  'insert-new-record': 'RecordController.newRecord'

};
