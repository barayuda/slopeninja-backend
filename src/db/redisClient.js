import Redis from 'ioredis';

const { REDIS_URL } = process.env;

const client = new Redis(REDIS_URL);

export default client;
