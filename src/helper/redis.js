import { config } from 'dotenv';
import { createClient } from 'redis';
config()
const client = await createClient({
  url:process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  
})
  .on('error', err => console.log('Redis Client Error', err))
  .connect();
// console.log('test');
export default client;  