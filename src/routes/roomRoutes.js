import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as room from '../controllers/roomController.js'

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/create-room', room.createRoom);
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.sendFile(path.join(__dirname, '../../public', 'room.html'));
});

export default router;