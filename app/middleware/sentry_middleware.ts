import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import * as Sentry from '@sentry/node'

export default class SentryMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      if (ctx.auth && ctx.auth.user) {
        Sentry.setUser({
          id: ctx.auth.user.id.toString(),
          email: ctx.auth.user.email,
        })
      }

      await next()
    } catch (error) {
      Sentry.captureException(error)
      throw error // On relance l'erreur pour qu'elle soit gérée par le gestionnaire d'erreurs d'Adonis
    }
  }
}
