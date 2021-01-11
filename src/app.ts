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

const server = app.listen(PORT, () => { console.log(`🔥 on ${PORT}`) })
const gracefulShutdown = () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
        client.quit();
        process.exit(0);
    })
}
process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
