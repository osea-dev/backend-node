import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-very-secure-secret-key';  // Make sure to set this in environment variables

export const createContextMiddleware = (): RequestHandler => (req, res, next) => {
    let userId = null
    let roles = null

    // const authHeader = req.header.authorization
    const authHeader = req.get('Authorization')

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]
        try {
            // Verify then token and extract
            const decoded = jwt.verify(token, JWT_SECRET) as {
                userId: string,
                roles: string[]
            }

            // Populate userId and roles from the tokens payload
            userId = decoded.userId
            roles = decoded.roles
        } catch (err) {
            console.error('JWT verification failed', err)
        }
    }

    // Centralized population of the context to be passed in the use cases
    req.context = {
        req,
        res,
        userId,
        roles
    }

    next()
}