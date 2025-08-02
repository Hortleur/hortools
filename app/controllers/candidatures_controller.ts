import type { HttpContext } from '@adonisjs/core/http'
import Candidature from '#models/candidature'
import { createCandidatureValidator, updateCandidatureValidator } from '#validators/candidature'
import CandidatureStatus from '#models/candidature_status'
import * as Sentry from '@sentry/node'

export default class CandidaturesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    try {
      const candidatures = await Candidature.query().preload('status')
      return {
        candidatures: candidatures,
      }
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          type: 'database_error',
        },
        extra: {
          error: error,
        },
      })

      throw error
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
    try {
      const candidature = await Candidature.findOrFail(params.id)

      return {
        candidature: candidature.serialize(),
      }
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          type: 'database_error',
        },
        extra: {
          error: error,
        },
      })
      throw error
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    try {
      const candidature = await Candidature.findOrFail(params.id)
      const { link, company, statusId, dateOfApplication } = await request.validateUsing(
        updateCandidatureValidator
      )

      // Création d'une transaction pour assurer l'intégrité des données
      const updatedCandidature = await Candidature.transaction(async (trx) => {
        candidature.useTransaction(trx)
        candidature.merge({ link, company, date_of_application: dateOfApplication })
        await candidature.save()
        const status = await CandidatureStatus.findOrFail(statusId)
        await candidature.related('status').associate(status)
        return candidature
      })

      return {
        candidature: updatedCandidature.serialize(),
        message: 'La candidature a été modifiée avec succès',
      }
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          type: 'database_error',
          operation: 'update_candidature',
          candidatureId: params.id,
        },
        extra: {
          error: error,
        },
        level: 'error', // On utilise une chaîne de caractères plutôt que Severity
        contexts: {
          candidature: {
            id: params.id,
          },
        },
      })

      // Rethrow avec un message plus explicite
      throw new Error('Une erreur est survenue lors de la mise à jour de la candidature')
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    try {
      const candidature = await Candidature.findOrFail(params.id)
      await candidature.delete()

      return {
        message: 'La candidature à été supprimée avec succès',
      }
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          type: 'database_error',
        },
        extra: {
          error: error,
        },
      })
    }
  }
}
