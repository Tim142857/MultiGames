/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  sendMessage: function (req, res) {
    var pseudo = req.param('pseudo');
    var type = req.param('type');
    var message = req.param('message');
    var params = {pseudo: pseudo, message: message, type: type};

    sails.sockets.blast('new-message', params);
    res.send({succes: true});
  },

  newChatter: function (req, res) {
    var newPseudo = req.param('pseudo');

    var pseudo = null;
    var type = 'info';
    var message = newPseudo + ' vient de se connecter';
    var params = {pseudo: pseudo, message: message, type: type};

    sails.sockets.blast('new-chatter', params);
    res.send({succes: true});
  }
};

