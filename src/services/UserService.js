const { knex } = require('../config/db');
const UserModel = require('../models/UserModel');
const { toUnixEpoch } = require('../helpers/Datetime');

const formatRecord = record => ({
  ...record,
  createdAt: toUnixEpoch(record.createdAt),
  updatedAt: toUnixEpoch(record.updatedAt),
  deletedAt: record.deletedAt ? toUnixEpoch(record.deletedAt) : null,
});

class UserService {
  static async list() {
    const records = await UserModel.list();
    return records.map(formatRecord);
  }

  static async get(data) {
    const record = await UserModel.get(data);
    if (!record) {
      return null;
    }
    return formatRecord(record);
  }

  static post(data) {
    return UserModel.post(data);
  }

  static put(userId, data) {
    return knex.transaction(async trx => {
      const user = await UserModel.get(userId).transacting(trx);
      if (!user) {
        return false;
      }
      await UserModel.put(user.id, data).transacting(trx);
      return true;
    });
  }

  static delete(userId) {
    return knex.transaction(async trx => {
      const user = await UserModel.get(userId).transacting(trx);
      if (!user) {
        return false;
      }
      await UserModel.delete(user.id).transacting(trx);
      return true;
    });
  }
}

module.exports = UserService;
