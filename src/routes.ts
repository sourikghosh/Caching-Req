import router, { Request, Response, NextFunction } from "express"

const routes = router()
routes.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({
        message: '☘'
    })
})

export default routes