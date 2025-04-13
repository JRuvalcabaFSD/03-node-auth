import { Router } from 'express';
import { AuthController } from './auth.controller';
import { MongoAuthDatasource, MongoAuthRepository } from '../../infrastructure';

export class AuthRoutes {
	static get routes(): Router {
		const router = Router();

		const authDatasource = new MongoAuthDatasource();
		const authRepository = new MongoAuthRepository(authDatasource);
		const { loginUser, registerUser } = new AuthController(authRepository);

		router.post('/login', loginUser);
		router.post('/register', registerUser);

		return router;
	}
}
