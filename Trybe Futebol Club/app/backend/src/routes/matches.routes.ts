import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import Validate from '../middlewares/Validate';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', (req, res) => matchesController.matches(req, res));
matchesRouter.post(
  '/',
  Validate.Token,
  Validate.TeamMatch,
  (req, res) => matchesController.createMatch(req, res),
);
matchesRouter.patch(
  '/:id/finish',
  Validate.Token,
  (req, res) => matchesController.finishMatch(req, res),
);
matchesRouter.patch(
  '/:id',
  Validate.Token,
  (req, res) => matchesController.updateMatch(req, res),
);

export default matchesRouter;
