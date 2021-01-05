import express, { Request, Response, NextFunction } from "express"
import routes from "./routes"
interface HttpError extends Error {
    status?: number;
    statusCode?: number;
}
const app = express()
app.use(routes)
app.use(async (req: Request, res: Response, next: NextFunction) => {
    const error: HttpError = new Error("Not found")
    error.status = 404
    next( error )
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
