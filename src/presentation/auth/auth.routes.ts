import { Router } from 'express';
import { AuthController } from './auth.controller';
import { MongoAuthDatasource, MongoAuthRepository } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {
	static get routes(): Router {
		const router = Router();

		const authDatasource = new MongoAuthDatasource();
		const authRepository = new MongoAuthRepository(authDatasource);
		const { loginUser, registerUser, getUser } = new AuthController(authRepository);

		router.post('/login', loginUser);
		router.post('/register', registerUser);
		router.get('/', [AuthMiddleware.validateJwt], getUser);

		return router;
	}
}
