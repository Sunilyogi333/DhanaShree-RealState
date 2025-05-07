/**
 * File: seed-address.ts
 * Description: This script is used for seeding address data into a database.
 */
import chalk from 'chalk'
import fs from 'fs'
import readline from 'readline-sync'
import { AppDataSource } from '../config/database.config'
import { District } from '../entities/address/district.entity'
import { Municipality } from '../entities/address/municipality.entity'
import { Province } from '../entities/address/province.entity'
import { Ward } from '../entities/address/ward.entity'
// import { Print } from '../utils/Print'

const args = process.argv.slice(2)

const fieldEntityMapping: any = {
  province: Province,
  district: District,
  municipality: Municipality,
  ward: Ward,
}
/**
 * Determine the field to be seeded based on command line arguments.
 * Valid arguments are -province, -district, -municipality, -ward.
 * If an invalid argument is provided, the script exits with an error message.
 */
let field: any
if (args[0] === '-province') {
  field = 'province'
} else if (args[0] === '-district') {
  field = 'district'
} else if (args[0] === '-municipality') {
  field = 'municipality'
} else if (args[0] === '-ward') {
  field = 'ward'
} else {
  // Print.ERROR('Please enter a valid field')
  console.error(chalk.red('Please enter a valid field'))
  process.exit()
}

AppDataSource.initialize()
  .then(async (_) => {
    // eslint-disable-next-line n/no-path-concat
    const filePath = __dirname + `/db/${field}.sql`
    // *Check data is already in a table or not

    const dataRepository = AppDataSource.getRepository(fieldEntityMapping[field])

    if ((await dataRepository.count()) > 0) {
      const answer: boolean = readline.keyInYN(
        chalk.red(`${field} already exists in the table. Do you want to replace it?`)
      ) as boolean
      if (answer) {
        return
      } else {
        // *Remove all rows from table
        await dataRepository.createQueryBuilder().delete().execute()
      }
    }

    const seedQuery = fs.readFileSync(filePath, { encoding: 'utf8' })
    await AppDataSource.query(seedQuery)
    // Print.INFO('Seeding completed')
    console.log(chalk.green('Seeding completed'))
  })
  .catch((err) => {
    // Print.ERROR(err.toString())
    console.error(chalk.red(err.toString()))
  })
  .finally(() => {
    void AppDataSource.destroy()
    process.exit(0)
  })
