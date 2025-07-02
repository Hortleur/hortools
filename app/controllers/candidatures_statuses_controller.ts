import type { HttpContext } from '@adonisjs/core/http'
import { createCandidaturesStatusValidator, updateCandidaturesStatusValidator } from '#validators/candidatures_status'
import CandidatureStatus from '#models/candidature_status'

export default class CandidaturesStatusesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const statuses = await CandidatureStatus.all()

    return {
      statuses: statuses,
    }
  }

  /**
   * Display form to create a new record
   */
  async store({ request }: HttpContext) {
    const { name } = await request.validateUsing(createCandidaturesStatusValidator)

    const status = await CandidatureStatus.create({ name: name })

    return {
      status: status.serialize(),
      message: 'Le status à été crée avec succès',
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const status = await CandidatureStatus.findOrFail(params.id)
    return {
      status: status.serialize(),
    }
  }

  async update({ params, request }: HttpContext) {
    const status = await CandidatureStatus.findOrFail(params.id)
    const { name } = await request.validateUsing(updateCandidaturesStatusValidator)

    const updatedStatus = await CandidatureStatus.updateOrCreate({ id: status.id }, { name: name })

    return {
      status: updatedStatus.serialize(),
      message: 'Le status à été modifiée avec succès',
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const status = await CandidatureStatus.findOrFail(params.id)
    await status.delete()

    return {
      message: 'Le status à été supprimée avec succès',
    }
  }
}
