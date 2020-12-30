import router, { Request, Response, NextFunction } from "express"
import client from './db'
import axios from 'axios'
const routes = router()
routes.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({
        message: '☘'
    })
}).post('/api/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await axios.get('')
        client.set('', '')

    } catch (err) {
        next(err)
    }
})

export default routes