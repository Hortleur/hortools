import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidatures'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('link', 254).notNullable()
      table.string('company', 254).notNullable()
      table.date('date_of_application').notNullable()
      table.integer('status_id').unsigned().references('id').inTable('candidature_statuses')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
