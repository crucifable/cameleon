import { Redis } from '@upstash/redis';

// Upstash Redis works via HTTP, making it perfect for Cloudflare Edge
export const redis = new Redis({
    url: process.env.REDIS_URL || '',
    token: process.env.REDIS_TOKEN || '',
});

export default redis;
