const winston = require('winston');

/* Logger use RFC5424 */
class Logger {

  static emerg(...emerg) {
    winston.log('emerg', ...emerg);
  }

  static alert(...alert) {
    winston.log('alert', ...alert);
  }

  static crit(...crit) {
    winston.log('crit', ...crit);
  }

  static error(...error) {
    winston.log('error', ...error);
  }

  static warning(...warning) {
    winston.log('warning', ...warning);
  }

  static notice(...notice) {
    winston.log('notice', ...notice);
  }

  static info(...info) {
    winston.log('info', ...info);
  }

  static blacklists(req, list = []) {
    req._routeBlacklists.body = list; // eslint-disable-line
  }

  static throw(res, code, ...args) {
    this.error(...args);
    res.status(500).send({ success: false, code, message: res.__('helpers.logger.throw') });
  }
}

module.exports = Logger;
