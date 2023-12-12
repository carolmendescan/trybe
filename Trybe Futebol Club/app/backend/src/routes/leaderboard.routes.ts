import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();
const router = Router();

router.get('/', (req, res) => leaderboardController.findLeaderboard(req, res));
router.get('/home', (req, res) => leaderboardController.findHomeLeaderboard(req, res));
router.get('/away', (req, res) => leaderboardController.findAwayLeaderboard(req, res));

export default router;
