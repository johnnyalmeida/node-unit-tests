const winston = require('winston');
const expressWinston = require('express-winston');
const request = require('request');
const debug = require('request-debug');
const moment = require('moment-timezone');
const { clone, each } = require('lodash');
const Logger = require('../helpers/Logger');
const Settings = require('./Settings');

const instances = {
  init: false,
  expressRequest: false,
  expressError: false,
};

class LoggerConfig {
  static init() {
    if (instances.init) {
      throw Error('Logger: init already executed');
    }

    instances.init = true;
    winston.configure({
      exitOnError: false,
      levels: this.getLevels(),
      colors: this.getColors(),
      transports: this.getTransports(),
    });

    debug(request, this.requestDebugFormatter);
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
  }

  static getTransports() {
    const transports = [
      new winston.transports.Console({
        timestamp: () => {
          return moment.utc().format('YYYY-MM-DD HH:mm:ss');
        },
        json: false,
        colorize: true,
      }),
    ];


    return transports;
  }

  static getLevels() {
    return {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7, // 'debug' entries were not displayed
    };
  }

  static getColors() {
    return {
      emerg: 'bgRed',
      alert: 'bgMagenta',
      crit: 'bgRed',
      error: 'red',
      warning: 'yellow',
      notice: 'bgBlue',
      info: 'green',
      debug: 'white',
    };
  }

  static requestDebugFormatter(type, data) {
    let message = null;
    let status = 0;

    if (type === 'request') {
      message = {
        id: data.debugId,
        type,
        date: moment.utc().format('YYYY-MM-DD hh:mm:ss'),
        url: data.uri,
        method: data.method,
        message: data.body,
      };
    } else if (type === 'response') {
      status = data.statusCode;
      message = {
        id: data.debugId,
        type,
        date: moment.utc().format('YYYY-MM-DD hh:mm:ss'),
        status,
        message: data.body,
      };
    }

    if (message) {
      switch (LoggerConfig.getLevelByStatusCode(status)) {
        case 'warning': Logger.warning(message); break;
        case 'error': Logger.error(message); break;
        case 'crit': Logger.crit(message); break;
        default: Logger.info(message);
      }
    } else {
      Logger.warning(type, data);
    }
  }

  static replacePropertyValue(keys, object) {
    const newObject = clone(object);

    each(object, (val, key) => {
      if (keys.indexOf(key) !== -1) {
        newObject[key] = '******';
      } else if (typeof (val) === 'object') {
        newObject[key] = LoggerConfig.replacePropertyValue(keys, val);
      }
    });

    return newObject;
  }

  static expressRequest(app) {
    if (instances.expressRequest) {
      throw Error('Logger: expressRequest already executed');
    }

    instances.expressRequest = true;
    app.use(expressWinston.logger(this.getLoggerOptions()));
  }

  static expressError(app) {
    if (instances.expressError) {
      throw Error('Logger: expressError already executed');
    }

    instances.expressError = true;
    app.use(expressWinston.errorLogger(this.getLoggerOptions()));

    app.use((err, req, res, next) => { // eslint-disable-line
      res.status(err.status || 500);
      res.send({ code: 0, message: 'Falha interna do servidor' });
    });
  }

  static getLevelByStatusCode(code) {
    let level = 'info';
    if (code >= 400) { level = 'warning'; }
    if (code >= 500) { level = 'error'; }
    if (code === 401 || code === 403) { level = 'crit'; }
    return level;
  }

  static getLoggerOptions() {
    const requestFilterBlacklist = ['headers', 'httpVersion', 'originalUrl', 'url', 'query', 'method'];
    const responseFilterBlacklist = [];
    const bodyBlacklist = Settings.get('LOG_BODY_BLACKLIST') || [];
    const ignoredRoutes = ['/', '/status', '/favicon.ico'];
    const ignoredMethods = ['OPTIONS'];
    return {
      winstonInstance: winston,
      meta: true,
      msg: `HTTP method={{req.method}} route={{req.originalUrl.split('?')[0]}} query={{JSON.stringify(req.query)}} origin={{req.ip}} size={{res._size}}B`,
      expressFormat: false,
      colorStatus: true,
      ignoredRoutes,
      requestFilter: (req, propName) => {
        if (requestFilterBlacklist.indexOf(propName) >= 0) {
          return undefined;
        }
        return req[propName];
      },
      responseFilter: (res, propName) => {
        if (responseFilterBlacklist.indexOf(propName) >= 0) {
          return undefined;
        }

        if (propName === 'body' && res[propName] && bodyBlacklist.length > 0) {
          return LoggerConfig.replacePropertyValue(bodyBlacklist, res[propName]);
        }

        return res[propName];
      },
      dynamicMeta: (req) => {
        const dynamicMeta = {};
        if (req.session) {
          dynamicMeta.session = req.session.id || null;
          dynamicMeta.user = req.session.user ? req.session.user.id : null;
        }
        return dynamicMeta;
      },
      skip: (req) => {
        const method = req.method.toUpperCase();
        return ignoredMethods.includes(method);
      }
    };
  }
}

module.exports = LoggerConfig;
