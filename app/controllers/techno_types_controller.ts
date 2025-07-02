import type { HttpContext } from '@adonisjs/core/http'
import TechnoType from '#models/techno_type'
import { createTechnoTypeValidator } from '#validators/techno_type'

export default class TechnoTypesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const technoTypes = await TechnoType.all()
    return {
      technoTypes: technoTypes,
    }
  }

  /**
   * Display form to create a new record
   */
  async store({ request }: HttpContext) {
    const { name } = await request.validateUsing(createTechnoTypeValidator)
    const technoType = await TechnoType.create({ name: name })
    return {
      technoType: technoType.serialize(),
      message: 'Le type de technologie à été crée avec succès',
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const technoType = await TechnoType.findOrFail(params.id)
    return {
      technoType: technoType.serialize(),
    }
  }

  /**
   * Edit individual record
   */
  async update({ params, request }: HttpContext) {
    const { name } = await request.validateUsing(createTechnoTypeValidator)
    const technoType = await TechnoType.findOrFail(params.id)
    technoType.name = name
    await technoType.save()

    return {
      technoType: technoType.serialize(),
      message: 'Le type de technologie à été modifiée avec succès',
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const technoType = await TechnoType.findOrFail(params.id)
    await technoType.delete()
    return {
      message: 'Le type de technologie à été supprimée avec succès',
    }
  }
}
