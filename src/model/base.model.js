const { Model, AjvValidator, snakeCaseMappers } = require('objection')
const { DbErrors } = require('objection-db-errors')
const baseModelSchema = require('../schema/base-model')

class BaseModel extends DbErrors(Model) {
  static get columnNameMappers () {
    return snakeCaseMappers()
  }

  static get idColumn () {
    return 'id'
  }

  static createValidator () {
    return new AjvValidator({
      onCreateAjv: ajv => {},
      options: {
        $data: true,
        $comment: true,
        inlineRefs: true,
        allErrors: true,
        validateSchema: true,
        ownProperties: true,
        schemas: [baseModelSchema]
      }
    })
  }
}

module.exports.BaseModel = BaseModel
