import { Application } from "express";
import config from "config";
import errorMiddleware from "middleware/error";
import { getAppRoutes } from "routes";
import {urlencoded,json} from "body-parser";
import cookieParser from 'cookie-parser'
import cors from 'cors'

export async function expressLoader ({ app }: {app: Application}) {
    const {appPrefix} = config;
    
    app.use(urlencoded({extended: true}))
    app.use(json())
    app.use(cors())
    app.use(cookieParser())

    app.use(`/${appPrefix}`, getAppRoutes())
    app.use(errorMiddleware)

    
    return app;
} 