import { UNAUTHORIZED } from '../constants/httpStatus.js';
import Authmid from './Auth.mid.js';
const adminMid = (req, res, next) => {
  if (!req.user.isAdmin) res.status(UNAUTHORIZED).send();

  return next();
};

export default [Authmid, adminMid];
