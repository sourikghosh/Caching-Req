import { createClient } from 'redis'
import { promisify } from 'util'


const client = createClient({
    port: +process.env.R_PORT! || 6379,
    host: process.env.R_HOST || "localhost",
    password: process.env.R_PASSWORD
})
client.on('connect', () => {
    console.log('Client connected to redis...')
})

client.on('ready', () => {
    console.log('Client connected to redis and ready to use...')
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('end', () => {
    console.log('Client disconnected from redis')
})
export const asyncGet = promisify(client.get).bind(client)
export const asyncSetex = promisify(client.setex).bind(client)

export default client