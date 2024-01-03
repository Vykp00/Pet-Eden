/*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": true}]*/
/*eslint-env es2016*/

// Initialize Redis client DB
import { createClient } from 'redis'

const redisClient = createClient() // This connects to localhost on port 6379.
// To connect to different host set { url: 'redis[s]://[[username][:password]@][host][:port][/db-number]' } in createClient()
redisClient.on('error', err => console.log('Redis Client Error', err))
redisClient.connect().catch(console.error)

export default redisClient
