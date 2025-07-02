import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'techno_techno_type'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('techno_id').unsigned().references('id').inTable('technos').onDelete('CASCADE')
      table.integer('techno_type_id').unsigned().references('id').inTable('techno_types')
      table.unique(['techno_id', 'techno_type_id'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
