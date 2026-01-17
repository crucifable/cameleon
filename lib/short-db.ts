import redis from './redis';

const PREFIX = 'short:';
const USER_PREFIX = 'user:links:';

export interface ShortLink {
    code: string;
    url: string;
    ownerId?: string;
    createdAt: number;
    expiresAt: number;
}

export async function getShortLink(code: string): Promise<ShortLink | null> {
    if (!redis) return null;
    try {
        const data = await redis.get(`${PREFIX}${code}`);
        if (!data) return null;
        return (typeof data === 'string' ? JSON.parse(data) : data) as ShortLink;
    } catch (error) {
        console.error('Redis get error:', error);
        return null;
    }
}

export async function getOriginalUrl(code: string): Promise<string | null> {
    const link = await getShortLink(code);
    return link?.url || null;
}

export async function saveShortLink(code: string, url: string, ownerId?: string): Promise<void> {
    if (!redis) throw new Error('Database connection missing');

    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const expiresAt = now + oneWeek;

    const link: ShortLink = {
        code,
        url,
        ownerId,
        createdAt: now,
        expiresAt,
    };

    try {
        // Save the link data with 1 week expiry in Redis
        await redis.set(
            `${PREFIX}${code}`,
            JSON.stringify(link),
            { px: oneWeek }
        );

        // If owned by a user, track it in their list
        if (ownerId) {
            await redis.sadd(`${USER_PREFIX}${ownerId}`, code);
        }
    } catch (error) {
        console.error('Redis set error:', error);
        throw new Error('Failed to save to Redis');
    }
}

export async function getUserLinks(userId: string): Promise<ShortLink[]> {
    if (!redis) return [];
    try {
        const codes = await redis.smembers(`${USER_PREFIX}${userId}`);
        if (!codes.length) return [];

        const pipeline = redis.pipeline();
        codes.forEach(code => pipeline.get(`${PREFIX}${code}`));
        const results = await pipeline.exec<string[]>();

        const links: ShortLink[] = [];
        results.forEach((data, index) => {
            if (data) {
                links.push(JSON.parse(data));
            } else {
                // If data is null, the link has expired in Redis
                // We should probably remove it from the user set too
                redis?.srem(`${USER_PREFIX}${userId}`, codes[index]);
            }
        });

        return links.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
        console.error('Redis getUserLinks error:', error);
        return [];
    }
}

export async function isAliasAvailable(code: string): Promise<boolean> {
    if (!redis) return false;
    const exists = await redis.exists(`${PREFIX}${code}`);
    return exists === 0;
}
