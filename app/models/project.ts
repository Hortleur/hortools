import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import ProjectImage from '#models/project_image'
import type { HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import ProjectGallery from '#models/project_gallery'
import Techno from '#models/techno'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare link: string

  @hasOne(() => ProjectImage, {
    foreignKey: 'project_id',
  })
  declare image: HasOne<typeof ProjectImage>

  @hasMany(() => ProjectGallery, {
    foreignKey: 'project_id',
  })
  declare galleries: HasMany<typeof ProjectGallery>

  @manyToMany(() => Techno)
  declare technos: ManyToMany<typeof Techno>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
