import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    setupFiles: ['dotenv/config'],
    globals: true
  }
})
