import express from 'express';
import * as servicesCtrl from '../controllers/servicesController.js';

const router = express.Router();

router.get('/', servicesCtrl.getAll);
router.get('/:code', servicesCtrl.getByCode);
router.post('/', servicesCtrl.create);
router.put('/:code', servicesCtrl.update);
router.delete('/:code', servicesCtrl.remove);

export default router;
