import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

// interface user {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
// }

interface TokenPayload {
  id: string;
  exp: number;
  accessTypes: string[];
  name: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | string[] | undefined = req.headers.authorization;
    if (token) {
      if (token.toLowerCase().startsWith('bearer')) {
        token = token.slice('bearer'.length).trim();
      }
      jwt.verify(
        token,
        process.env.SECRET,
        (err: Error, decoded: TokenPayload) => {
          if (err) {
            return res.status(401).json({
              error: 'Failed to authenticate token',
            });
          }
          next(decoded.id);
        }
      );
    } else {
      return res.status(403).json({
        error: 'Unauthorized user!',
      });
    }
  } catch (error) {
    return res.status(403).json({
      error: 'Unauthorized user!',
    });
  }
};
