/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

//Auth routes
router
  .group(() => {
    router.post('/login', '#controllers/auth_controller.login')
    //router.post('/hash', '#controllers/auth_controller.hash')
  })
  .prefix('api')

//candidatures status routes
router
  .group(() => {
    router
      .post('/status', '#controllers/candidatures_statuses_controller.store')
      .use(middleware.auth({ guards: ['api'] }))
    router.get('/status', '#controllers/candidatures_statuses_controller.index')
    router
      .get('/status/:id', '#controllers/candidatures_statuses_controller.show')
      .use(middleware.auth({ guards: ['api'] }))
    router
      .put('/status/:id', '#controllers/candidatures_statuses_controller.update')
      .use(middleware.auth({ guards: ['api'] }))
    router
      .delete('/status/:id', '#controllers/candidatures_statuses_controller.destroy')
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')

//candidatures routes
router
  .group(() => {
    router.get('/candidatures', '#controllers/candidatures_controller.index')
    router
      .post('/candidatures', '#controllers/candidatures_controller.store')
      .use(middleware.auth({ guards: ['api'] }))
    router.get('/candidatures/:id', '#controllers/candidatures_controller.show')
    router
      .put('/candidatures/:id', '#controllers/candidatures_controller.update')
      .use(middleware.auth({ guards: ['api'] }))
    router
      .delete('/candidatures/:id', '#controllers/candidatures_controller.destroy')
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')

//techno types routes
router
  .group(() => {
    router.get('/techno_types', '#controllers/techno_types_controller.index')
    router
      .post('/techno_types', '#controllers/techno_types_controller.store')
      .use(middleware.auth({ guards: ['api'] }))
    router.get('/techno_types/:id', '#controllers/techno_types_controller.show')
    router
      .put('/techno_types/:id', '#controllers/techno_types_controller.update')
      .use(middleware.auth({ guards: ['api'] }))
    router
      .delete('/techno_types/:id', '#controllers/techno_types_controller.destroy')
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')

//technos routes
router
  .group(() => {
    router.get('/technos', '#controllers/technos_controller.index')
    router
      .post('/technos', '#controllers/technos_controller.store')
      .use(middleware.auth({ guards: ['api'] }))
    router.get('/technos/:id', '#controllers/technos_controller.show')
    router
      .put('/technos/:id', '#controllers/technos_controller.update')
      .use(middleware.auth({ guards: ['api'] }))
    router
      .delete('/technos/:id', '#controllers/technos_controller.destroy')
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')

//projects routes
router
  .group(() => {
    router.get('/projects', '#controllers/projects_controller.index')
    router
      .post('/projects', '#controllers/projects_controller.store')
      .use(middleware.auth({ guards: ['api'] }))
    router.get('/projects/:id', '#controllers/projects_controller.show')
    router
      .put('/projects/:id', '#controllers/projects_controller.update')
      .use(middleware.auth({ guards: ['api'] }))
    router
      .delete('/projects/:id', '#controllers/projects_controller.destroy')
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')
