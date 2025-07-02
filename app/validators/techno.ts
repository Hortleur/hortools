import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new techno.
 */
export const createTechnoValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    icon: vine.string().trim(),
    technoTypeIds: vine.array(vine.number()),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing techno.
 */
export const updateTechnoValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    icon: vine.string().trim(),
    technoTypeIds: vine.array(vine.number()),
  })
)
