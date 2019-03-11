const { BaseModel } = require('./base.model')
const schema = require('../schema/read-property')

class BasePropertyModel extends BaseModel {
  static get tableName () {
    return 'properties'
  }

  static get jsonSchema () {
    return schema
  }

  $formatJson (json) {
    return {
      ...super.$formatJson(json),
      userId: undefined
    }
  }
}

module.exports.BasePropertyModel = BasePropertyModel
