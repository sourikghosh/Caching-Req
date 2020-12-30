import router, { Request, Response, NextFunction } from "express"
import { asyncGet, asyncSetex } from './db'
import axios from 'axios'
const routes = router()
routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send({
        message: '🔥'
    })
}).get('/api/user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await asyncGet('user')
        if (result) {
            console.log('using cached data')
            res.send(JSON.parse(result))
            return
        }
        const respone = await axios.get('https://jsonplaceholder.typicode.com/users')
        //for testing purpose only 5s
        const saveResult = await asyncSetex('user', 5, JSON.stringify(respone.data))
        console.log('new data cached', saveResult)
        res.send(respone.data)
    } catch (err) {
        next(err)
    }
}).get('/api/user/:user_id', async (req, res, next) => {
    try {
        const { user_id } = req.params
        const result = await asyncGet(user_id)
        if (result) {
            console.log('using cached data')
            res.send(JSON.parse(result))
            return
        }
        const respone = await axios.get(`https://jsonplaceholder.typicode.com/users/${user_id}`)
        //for testing purpose only 5s
        const cacheResult = await asyncSetex(user_id, 5, JSON.stringify(respone.data))
        console.log('new data cached', cacheResult)
        res.send(respone.data)
    } catch (err) {
        next(err)
    }
})

export default routes