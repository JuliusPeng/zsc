'use strict';

const controllers = require('../controllers');

// const wrap = fn => (...args) => fn(...args).catch(args[2]); // req, res, next
const wrap = fn => (...args) => fn(...args).catch(err => {args[1].sendErr(err);});

module.exports = (app) => {
  // app.route('/insurance').get(wrap(controllers.insurance.list));
  app.route('/insurance/count').get(wrap(controllers.insurance.count));
  app.route('/insurance/detail').get(wrap(controllers.insurance.detail));
  app.route('/insurance/add').post(wrap(controllers.insurance.add));
  app.route('/insurance/remove').post(wrap(controllers.insurance.remove));
  app.route('/insurance/update').post(wrap(controllers.insurance.update));
};