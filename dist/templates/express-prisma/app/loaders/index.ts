import { Application } from "express";
import { expressLoader } from "./express";
import logger from 'loglevel'

export default async function runLoaders ({app}: {app: Application}) {
    expressLoader({ app });
    logger.info('⚡ Express Initialized')

    logger.info('✅ All Loaders Done Working')
}