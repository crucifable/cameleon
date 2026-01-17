import redis from './redis';

const PREFIX = 'short:';

export async function getOriginalUrl(code: string): Promise<string | null> {
    try {
        return await redis.get(`${PREFIX}${code}`);
    } catch (error) {
        console.error('Redis get error:', error);
        return null;
    }
}

export async function saveShortLink(code: string, url: string): Promise<void> {
    try {
        // Save the link with no expiration (or you could add a TTL if desired)
        await redis.set(`${PREFIX}${code}`, url);
    } catch (error) {
        console.error('Redis set error:', error);
        throw new Error('Failed to save to Redis');
    }
}
