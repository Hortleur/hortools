import type { HttpContext } from '@adonisjs/core/http'
import Techno from '#models/techno'
import { createTechnoValidator } from '#validators/techno'

export default class TechnosController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const technos = await Techno.query().preload('types')
    return {
      technos: technos,
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createTechnoValidator)
    const newTechno = {
      name: data.name,
      icon: data.icon,
    }
    const techno = await Techno.create(newTechno)
    await techno.related('types').attach(data.technoTypeIds)

    return {
      techno: techno.serialize(),
      message: 'Le type de technologie à été crée avec succès',
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const techno = await Techno.findOrFail(params.id)
    return {
      techno: techno.serialize(),
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const techno = await Techno.findOrFail(params.id)
    const data = await request.validateUsing(createTechnoValidator)
    const updatedTechno = {
      name: data.name,
      icon: data.icon,
    }
    const updatedTechnoWithTypes = await Techno.updateOrCreate({ id: techno.id }, updatedTechno)
    await updatedTechnoWithTypes.related('types').sync(data.technoTypeIds)
    return {
      techno: updatedTechnoWithTypes.serialize(),
      message: 'Le type de technologie à été modifiée avec succès',
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const techno = await Techno.findOrFail(params.id)
    await techno.delete()
    return {
      message: 'Le type de technologie à été supprimée avec succès',
    }
  }
}
