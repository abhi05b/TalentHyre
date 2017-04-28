'use strict';

/**
 * Module dependencies
 */
var questionsPolicy = require('../policies/questions.server.policy'),
  questions = require('../controllers/questions.server.controller');

module.exports = function(app) {
  // Questions Routes
  app.route('/api/questions')
    .get(questions.list)
    .post(questions.create);

  app.route('/api/questions/:questionId').all(questionsPolicy.isAllowed)
    .get(questions.read)
    .put(questions.update)
    .delete(questions.delete);

    app.route('/api/question/download')
      .get(questions.download);

  // Finish by binding the Question middleware
  app.param('questionId', questions.questionByID);
};
