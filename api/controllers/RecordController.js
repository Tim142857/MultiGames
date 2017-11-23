/**
 * RecordController
 *
 * @description :: Server-side logic for managing records
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  newRecord: function (req, res) {
    var pseudo = req.param('pseudo');
    var score = req.param('score');
    var game = req.param('game');

    Record.create({pseudo: pseudo, game: game, score: score}).exec(function (err, records) {
      if (err) console.log(err);
    });
  },

  getRecords: function (req, res) {
    var game = req.param('game');
    Record.find({where: {game: game}, limit: 10, sort: 'name DESC'}).exec(function (err, records) {
      if (err) console.log(err);

      res.send(records);
    });
  }

};

