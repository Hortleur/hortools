import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/login'
import User from '#models/user'
import * as Sentry from '@sentry/node'
//import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)

      try {
        const user = await User.verifyCredentials(email, password)

        const token = await User.accessTokens.create(user)

        Sentry.captureMessage('Connexion réussie', {
          level: 'info',
          extra: {
            userId: user.id,
            email: email,
          },
        })

        return {
          token: token,
          ...user.serialize(),
        }
      } catch (error) {
        Sentry.captureException(error, {
          tags: {
            type: 'authentication_error',
          },
          extra: {
            email: email,
          },
        })

        throw error
      }
    } catch (validationError) {
      Sentry.captureException(validationError, {
        tags: {
          type: 'validation_error',
        },
        extra: {
          validation_details: validationError.messages,
        },
      })

      throw validationError
    }
  }

  /*async hash({ request }: HttpContext) {
    const data = request.all()
    console.log(data)

    const hashedPass = await hash.make(data.password)
    console.log(hashedPass)

    return {
      hash: hashedPass,
    }
  }*/

  logout() {
    //
  }
}
