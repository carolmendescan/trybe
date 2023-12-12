import jwt from 'jsonwebtoken';
import TokenToken from '../types/PayloadToken';

const TOKEN = process.env.JWT_SECRET || 'segredo';

const createToken = (payload: TokenToken): string => jwt.sign(payload, TOKEN);

// const decodeToken = (token) => jwt.verify(token, TOKEN);

export default {
  createToken,
// decodeToken,
};