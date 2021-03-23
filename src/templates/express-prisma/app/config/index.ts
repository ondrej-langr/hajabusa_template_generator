import dotenv from 'dotenv'

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    appPrefix: process.env.APP_URL_PREFIX || '',
    databaseURL: process.env.DATABASE_URI,
    appSecret: process.env.APP_SECRET || '',
    sessionLifetime: Number(process.env.SESSION_LIFETIME) || 120, 
    
    bcrypt: {
        saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10
    }
}