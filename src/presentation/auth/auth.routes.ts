import { Request, Response, Router } from 'express';
import { AuthController } from './auth.controller';

export class AuthRoutes {
	static get routes(): Router {
		const router = Router();
		const { loginUser, registerUser } = new AuthController();

		router.post('/login', loginUser);
		router.post('/register', registerUser);

		return router;
	}
}
