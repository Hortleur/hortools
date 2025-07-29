import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import { createProjectValidator, updateProjectValidator } from '#validators/project'
import ProjectGallery from '#models/project_gallery'

export default class ProjectsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const projects = await Project.query().preload('image')
    return {
      projects: projects,
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createProjectValidator)

    const project = await Project.create({
      name: data.name,
      description: data.description,
      link: data.link,
    })

    if (data.imageUrl) {
      await project.related('image').create({ url: data.imageUrl })
    }

    if (data.galleryUrls) {
      let galleriesArr = []
      for (const url of data.galleryUrls) {
        galleriesArr.push({ url: url })
      }
      await project.related('galleries').createMany(galleriesArr)
    }

    if (data.technoIds) {
      let techIds = []
      for (const id of data.technoIds) {
        techIds.push(Number(id))
      }
      await project.related('technos').sync(techIds)
    }

    return {
      project: project.serialize(),
      message: 'Le projet à été crée avec succes',
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    const galleries = await project.related('galleries').query()
    const image = await project.related('image').query()
    const technos = await project.related('technos').query()

    return {
      project: project,
      galleries: galleries,
      image: image,
      technos: technos,
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(updateProjectValidator)

    const project = await Project.findOrFail(params.id)

    project.name = data.name
    project.description = data.description
    // @ts-ignore
    project.link = data.link

    await project.save()
    await project.related('technos').sync(data.technoIds)
    await project.related('image').updateOrCreate({ id: project.id }, { url: data.imageUrl })

    if (data.galleryUrls) {
      const galleries = await ProjectGallery.findManyBy('project_id', params.id)
      for (const gallery of galleries) {
        await gallery.delete()
      }
      let galleriesArr = []
      for (const url of data.galleryUrls) {
        galleriesArr.push({ url: url })
      }
      await project.related('galleries').createMany(galleriesArr)
    }

    return {
      project: project.serialize(),
      message: 'Le projet à été modifié avec succes',
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    await project.delete()

    return {
      message: 'Le projet à été supprimé avec success',
    }
  }
}
