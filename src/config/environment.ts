import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const PROD = process.env.NODE_ENV === 'production'

const EnvironmentConfigSchema = z.object({
    NODE_ENV: z.coerce.string().toLowerCase().default('development'),
    PORT: z.coerce.number().default(8080),
    MYSQL_CONNECTION_STRING: z
        .string()
        .default(() => (PROD ? '' : '')),
    REDIS_CONNECTION_URL: z
        .string()
        .default(() => (PROD ? '' : 'redis//redis'))
})

type EnvironmentConfig = z.infer<typeof EnvironmentConfigSchema> & { PROD: boolean }

export const env: EnvironmentConfig = {
    ...EnvironmentConfigSchema.parse(process.env),
    get PROD() {
        return this.NODE_ENV === 'production'
    },
} as const