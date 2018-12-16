const { knex } = require('../config/db');

// Store settings data
const data = {};

class Settings {
  static async load() {
    const rows = await knex.select([
      'name',
      'type',
      'value',
    ]).from('settings');

    for (let i = 0; i < rows.length; i += 1) {
      switch (rows[i].type) {
        case 'NUMBER': data[rows[i].name] = parseInt(rows[i].value, 10); break;
        case 'FLOAT': data[rows[i].name] = parseFloat(rows[i].value); break;
        case 'STRING': data[rows[i].name] = String(rows[i].value); break;
        case 'BOOLEAN': data[rows[i].name] = rows[i].value === 'true' || rows[i].value === 'i'; break;
        case 'OBJECT': data[rows[i].name] = JSON.parse(rows[i].value); break;
        default: data[rows[i].name] = undefined;
      }
    }
  }

  static get(key) {
    if (typeof data[key] !== 'undefined') {
      return data[key];
    }

    return null;
  }
}

module.exports = Settings;
