import redis from './redis';

const PREFIX = 'short:';

export async function getOriginalUrl(code: string): Promise<string | null> {
    if (!redis) {
        console.error('Redis is not configured. Cannot retrieve link.');
        return null;
    }
    try {
        return await redis.get(`${PREFIX}${code}`);
    } catch (error) {
        console.error('Redis get error:', error);
        return null;
    }
}

export async function saveShortLink(code: string, url: string): Promise<void> {
    if (!redis) {
        console.error('Redis is not configured. Cannot save link.');
        throw new Error('Database connection missing');
    }
    try {
        await redis.set(`${PREFIX}${code}`, url);
    } catch (error) {
        console.error('Redis set error:', error);
        throw new Error('Failed to save to Redis');
    }
}
