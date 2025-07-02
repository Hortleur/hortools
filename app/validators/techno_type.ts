import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new techno type.
 */
export const createTechnoTypeValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing techno type.
 */
export const updateTechnoTypeValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
