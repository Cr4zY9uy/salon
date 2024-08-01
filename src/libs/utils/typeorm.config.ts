import { registerAs } from '@nestjs/config'
import { config as dotenvConfig } from 'dotenv'
import * as process from 'node:process'
import { DataSource, DataSourceOptions } from 'typeorm'

dotenvConfig({ path: '../../../.env' })

const config = {
  type: `${process.env.DATABASE_TYPE || 'mysql'}`,
  host: `${process.env.DATABASE_HOST || 'localhost'}`,
  port: `${process.env.DATABASE_PORT || 3306}`,
  username: `${process.env.DATABASE_USERNAME || 'root'}`,
  password: `${process.env.DATABASE_PASSWORD || ''}`,
  database: `${process.env.DATABASE_TABLE || 'salon'}`,
  synchronize: false,
  logging: false, // Debug mode change to true
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  retryAttempts: 1
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)
