import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new project.
 */
export const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    description: vine.string().trim(),
    link: vine.string().trim().optional(),
    technoIds: vine.array(vine.number()),
    imageUrl: vine.string().optional(),
    galleryUrls: vine.array(vine.string()).optional(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing project.
 */
export const updateProjectValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    description: vine.string().trim(),
    link: vine.string().trim().optional(),
    technoIds: vine.array(vine.number()),
    imageUrl: vine.string().optional(),
    galleryUrls: vine.array(vine.string()).optional(),
  })
)
