import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // per minute in milliseconds
  max: 1000,
  message: 'You have exceeded the 1000 requests in per minute limit!',
  standardHeaders: true,
  legacyHeaders: false,
})
