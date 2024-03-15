import jwt from "jsonwebtoken";
import { notAuthorized } from "../helpers/helper.function.js";
import dotenv from 'dotenv'
dotenv.config()

export const verifyUserIdentity = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'secret', (err, decode) =>  {
            if (err) {
                
                return notAuthorized(res, 'Please login or create an account ');
            } else {
                req.user = decode;
                console.log(req.user)
                next();
            }
        });
    } else {
        return notAuthorized(res, 'Access denied');
    }

} 