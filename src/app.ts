import express, { Request, Response, NextFunction } from "express"
import createError, { HttpError } from 'http-errors'

const app = express()
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({
        message: '☘'
    })
})
app.use(async (req: Request, res: Response, next: NextFunction) => {
    next(new createError.NotFound())
})

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})
const PORT = process.env.PORT || 4000
app.listen(PORT, () => { console.log(`🔥 on ${PORT}`) })