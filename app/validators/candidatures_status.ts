import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new candidatures status.
 */
export const createCandidaturesStatusValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing candidatures status.
 */
export const updateCandidaturesStatusValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
