import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new candidature.
 */
export const createCandidatureValidator = vine.compile(
  vine.object({
    link: vine.string().trim(),
    statusId: vine.number(),
    dateOfApplication: vine.date(),
    company: vine.string().trim(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing candidature.
 */
export const updateCandidatureValidator = vine.compile(
  vine.object({
    link: vine.string().trim(),
    statusId: vine.number(),
    dateOfApplication: vine.date(),
    company: vine.string().trim(),
  })
)
