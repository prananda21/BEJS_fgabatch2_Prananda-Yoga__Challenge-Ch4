import e from 'express';
import UserController from '../controller/user.controller.js';
import CredentialController from '../controller/credential.controller.js';
import AddressController from '../controller/address.controller.js';
import AccountController from '../controller/account.controller.js';

const router = e.Router();

// endpoint /api/v1/users
router.route('/').get(UserController.getAll);

// endpoint /api/v1/users/register
router
  .route('/register')
  .post(UserController.register);
router
  .route('/register/credential')
  .post(CredentialController.create);

// endpoint /api/v1/users/:id
router
  .route('/:user_id')
  .get(UserController.get)
  .patch(UserController.update);

// endpoint /api/v1/users/:id/addresses
router
  .route('/:user_id/addresses/:address_id')
  .get(AddressController.get);
router
  .route('/:user_id/addresses/register')
  .post(AddressController.create);

// endpoint /api/v1/users/:id/accounts
router
  .route('/:user_id/accounts/register')
  .post(AccountController.create);
router
  .route('/:user_id/accounts/:account_id')
  .get(AccountController.find);
router
  .route('/:user_id/accounts/')
  .get(AccountController.findAll);
// router.route("/:user_id/accounts/register")

export default router;
