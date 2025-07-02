import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import CandidatureStatus from '#models/candidature_status'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Candidature extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare link: string

  @column()
  declare company: string

  @column()
  declare date_of_application: Date

  @column()
  declare status_id: number

  @belongsTo(() => CandidatureStatus, {
    foreignKey: 'status_id', // Spécifie le nom de la colonne dans la table candidatures
  })
  declare status: BelongsTo<typeof CandidatureStatus>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
