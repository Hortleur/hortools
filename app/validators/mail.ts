import vine from '@vinejs/vine'

export const mailValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    subject: vine.string().trim(),
    message: vine.string().trim(),
  })
)
