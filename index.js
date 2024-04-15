const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

// Connect to Redis
const REDIS_PORT = 6379;
const redisClient = redis.createClient({url: `redis://redisDB:${REDIS_PORT}`});

redisClient.on('error', (err) => {
  console.log('Redis Client Error', err);
});
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});
redisClient.connect();



// Connect to MongoDB
const DB_USER = 'root';
const DB_PASSWORD = 'test';
const DB_HOST = 'mongoDB'; // name of the docker-compose service
const DB_PORT = '27017';
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`).then(() => {console.log('Connected to MongoDB')}).catch((err) => {console.log(err)});
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  redisClient.set('key', 'password');
  res.send('Hello World! hi there hi');
});

app.get('/data', async(req, res) => {
  const data = await redisClient.get('key');
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});