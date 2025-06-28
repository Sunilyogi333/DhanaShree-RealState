import cron from 'node-cron'
import orphanImageCleanup from '../scripts/cleanupOrphanImages'
import { AppDataSource } from '../config/database.config'

export function setupOrphanImageCron() {
  // Every Monday at 00:00 (midnight)
  cron.schedule('0 0 * * 1', async () => {
    console.log('🧹 Weekly orphan image cleanup running (Monday @ 12AM)...')

    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
      }

      await orphanImageCleanup()
    } catch (error) {
      console.error('Cleanup Cron Error:', error)
    }
  })
}
