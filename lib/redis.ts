import { Redis } from '@upstash/redis';

// Upstash Redis works via HTTP, making it perfect for Cloudflare Edge
// We only initialize if the variables are present to avoid build-time warnings
const redisUrl = process.env.REDIS_URL;
const redisToken = process.env.REDIS_TOKEN;

export const redis = redisUrl && redisToken
    ? new Redis({ url: redisUrl, token: redisToken })
    : null;

/**
 * Helper to check if Redis is configured
 */
export function isRedisConfigured(): boolean {
    return !!redis;
}

export default redis;
