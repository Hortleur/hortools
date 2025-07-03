import type { ApplicationService } from '@adonisjs/core/types'
import * as Sentry from '@sentry/node'
import env from '#start/env'

export default class GlitchtipProvider {
  constructor(protected app: ApplicationService) {}

  async boot() {
    const dsn = env.get('GLITCHTIP_DSN')

    Sentry.init({
      dsn: dsn,
      environment: env.get('NODE_ENV'),
      debug: true,
    })

    console.log('GlitchTip initialized with DSN:', dsn)
  }

  async shutdown() {
    await Sentry.close()
  }
}
