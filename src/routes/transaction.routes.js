import e from 'express';
import TxController from '../controller/transaction.controller.js';

const router = e.Router();

router.route('/').get(TxController.findAll);
router.route('/:tx_id').get(TxController.find);
router
  .route('/:number')
  .post(TxController.transfer);

export default router;
