import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();

const teamsController = new TeamsController();

teamsRouter.get('/', (req, res) => teamsController.findAll(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.findByPk(req, res));

export default teamsRouter;
