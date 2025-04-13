import { Request, Response } from 'express';
import { CustomError, RegisterUserDto } from '../../domain';
import { MongoAuthDatasource, MongoAuthRepository } from '../../infrastructure';
import { JwtAdapter } from '../../config';

export class AuthController {
	constructor(private readonly authRepository: MongoAuthRepository) {}

	private handleError(error: unknown, res: Response): void {
		if (error instanceof CustomError) {
			res.status(error.httpCode).json({ error: error.message });
			return;
		}

		res.status(500).json({ error: 'Internal server error' });
	}

	registerUser = (req: Request, res: Response) => {
		const [error, data] = RegisterUserDto.create(req.body);
		if (error) this.handleError(CustomError.badRequest(error), res);

		this.authRepository
			.register(data!)
			.then(async user => {
				res.status(201).json({ user, token: await JwtAdapter.generateToken({ email: user.email }) });
			})
			.catch(error => this.handleError(error, res));
	};
	loginUser = (req: Request, res: Response) => {
		res.json('login user controller');
	};
}
