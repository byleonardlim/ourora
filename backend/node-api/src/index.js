import express from 'express';
import { MongoClient } from 'mongodb';
import Redis from 'ioredis';

const app = express();
const port = process.env.PORT || 3000;

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const mongoClient = new MongoClient(mongoUrl, { serverSelectionTimeoutMS: 2000 });
const redisClient = new Redis(redisUrl, { lazyConnect: true, connectTimeout: 2000 });

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/health/mongo', async (_req, res) => {
  try {
    await mongoClient.db('admin').command({ ping: 1 });
    res.json({ status: 'ok', mongoUrl });
  } catch (error) {
    res.status(500).json({ status: 'error', error: String(error) });
  }
});

app.get('/health/redis', async (_req, res) => {
  try {
    if (!redisClient.status || redisClient.status === 'end') {
      await redisClient.connect();
    }
    await redisClient.ping();
    res.json({ status: 'ok', redisUrl });
  } catch (error) {
    res.status(500).json({ status: 'error', error: String(error) });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Node API listening on port ${port}`);
});
