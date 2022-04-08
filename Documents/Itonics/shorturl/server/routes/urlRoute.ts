import express from 'express';
const router = express.Router();
import * as urlController from './../controllers/urlController';
import { verifyToken as auth } from './../middlewares/auth';

router.post('/', urlController.create);
router.get('/shortUrl/:uid', auth, urlController.getAll); // :uid is the userId
// router.get("/", auth, urlController.getAll);
router.get('/:shortUrl', urlController.getOne);

export = router;
