import type { HttpContext } from '@adonisjs/core/http'
import { mailValidator } from '#validators/mail'
import mail from '@adonisjs/mail/services/main'
import edge from 'edge.js'
import app from '@adonisjs/core/services/app'

export default class MailController {
  async sendMail({ request, response }: HttpContext) {
    try {
      edge.mount('default', app.viewsPath())
      // Validation des données
      const data = await request.validateUsing(mailValidator)

      // Envoi de l'email
      await mail.send((message) => {
        message.from('dev@kevinb.run')
        message.to('dev@kevinb.run')
        message.replyTo(data.email)
        message.subject(data.subject)
        message.html(
          edge.renderSync('emails/contact', {
            ...data,
          })
        )
      })

      // Réponse en cas de succès
      return response.status(200).json({
        status: 'success',
        message: 'Email envoyé avec succès',
      })
    } catch (error) {
      // Gestion des erreurs
      console.error("Erreur lors de l'envoi de l'email:", error)

      return response.status(500).json({
        status: 'error',
        message: "Une erreur est survenue lors de l'envoi de l'email",
      })
    }
  }
}
