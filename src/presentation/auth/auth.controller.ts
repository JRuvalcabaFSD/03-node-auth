import { Request, Response } from 'express';
import { CustomError, RegisterUserDto } from '../../domain';

export class AuthController {
	constructor() {}

	private handleError(error: unknown, res: Response): void {
		console.error({ source: 'auth.controller.ts', error });

		if (error instanceof CustomError) {
			res.status(error.httpCode).json({ error: error.message });
			return;
		}

		res.status(500).json({ error: 'Internal server error' });
	}

	registerUser = (req: Request, res: Response) => {
		const [error, data] = RegisterUserDto.create(req.body);
		if (error) this.handleError(CustomError.badRequest(error), res);

		res.json(data);
	};
	loginUser = (req: Request, res: Response) => {
		res.json('login user controller');
	};
}
