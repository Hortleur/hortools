import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/login'
import User from '#models/user'
//import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return {
      token: token,
      ...user.serialize(),
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
