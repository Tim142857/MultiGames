/**
 * ArrowsController
 *
 * @description :: Server-side logic for managing Arrows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  checkNewRecord: function (req, res) {
    var score = req.param('score');

    Record.find({where: {game: 'arrows'}, limit: 10, sort: 'name DESC'}).exec(function (err, records) {
      if (err) console.log(err);

      if (score > records[0].score) {
        res.send({newRecord: true});
      } else {
        res.send({newRecord: false});
      }
    });

  }

};

