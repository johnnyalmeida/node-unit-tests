const moment = require('moment-timezone');

class Datetime {
  static toUnixEpoch(dateString) {
    return moment.utc(dateString).valueOf();
  }
}

module.exports = Datetime;
