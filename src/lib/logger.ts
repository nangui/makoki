/**
 * Logger utility for Makoki Test
 * Only logs in development mode to keep production bundle clean
 */

// In production builds, Vite will replace import.meta.env.MODE with 'production'
// For Chrome extensions, we check the mode at build time
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDev = (import.meta as any).env?.MODE !== 'production'

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) {
      console.log(...args)
    }
  },
  warn: (...args: unknown[]) => {
    if (isDev) {
      console.warn(...args)
    }
  },
  error: (...args: unknown[]) => {
    // Always log errors, even in production, for debugging
    console.error(...args)
  },
}
