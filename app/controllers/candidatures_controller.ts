import type { HttpContext } from '@adonisjs/core/http'
import Candidature from '#models/candidature'
import { createCandidatureValidator, updateCandidatureValidator } from '#validators/candidature'
import CandidatureStatus from '#models/candidature_status'

export default class CandidaturesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const candidatures = await Candidature.query().preload('status')
    return {
      candidatures: candidatures,
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const { link, company, statusId, dateOfApplication } = await request.validateUsing(
      createCandidatureValidator
    )

    const candidature = await Candidature.create({
      link: link,
      company: company,
      date_of_application: dateOfApplication,
      status_id: statusId,
    })

    return {
      candidature: candidature.serialize(),
      message: 'La candidature à été crée avec succès',
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const candidature = await Candidature.findOrFail(params.id)
    return {
      candidature: candidature.serialize(),
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const candidature = await Candidature.findOrFail(params.id)
    const { link, company, statusId, dateOfApplication } = await request.validateUsing(
      updateCandidatureValidator
    )
    const updatedCandidature = await Candidature.updateOrCreate(
      { id: candidature.id },
      {
        link: link,
        company: company,
        date_of_application: dateOfApplication,
      }
    )

    const status = await CandidatureStatus.findOrFail(statusId)
    await candidature.related('status').associate(status)

    return {
      candidature: updatedCandidature.serialize(),
      message: 'La candidature à été modifiée avec succès',
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const candidature = await Candidature.findOrFail(params.id)
    await candidature.delete()

    return {
      message: 'La candidature à été supprimée avec succès',
    }
  }
}
