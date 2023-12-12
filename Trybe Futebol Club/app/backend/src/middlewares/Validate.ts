import { NextFunction, Request, Response } from 'express';
import Email from '../validations/email';
import { IUser } from '../Interfaces/user';
import IMatches from '../Interfaces/matches';
import JwtUtils from '../utils/JwtUtils';

class Validate {
  private static passwordMinLength = 6;
  static Login(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as IUser;
    if (!Email.isValidEmail(email) || password.length < Validate.passwordMinLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  }

  static Fields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as IUser;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    return next();
  }

  static Token(req: Request, res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;
    const jwtUtils = new JwtUtils();
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const decode = jwtUtils.decodeToken(token);
      if (!decode) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
      res.locals.user = { ...decode };
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  static TeamMatch(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body as IMatches;
    if (homeTeamId === awayTeamId) {
      return res
        .status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    return next();
  }
}

export default Validate;
