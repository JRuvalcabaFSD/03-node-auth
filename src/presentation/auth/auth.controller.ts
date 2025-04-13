import { Request, Response } from 'express';
import { CustomError, RegisterUserDto } from '../../domain';
import { MongoAuthDatasource, MongoAuthRepository } from '../../infrastructure';

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
			.then(resp => res.status(201).json(resp))
			.catch(error => this.handleError(error, res));
	};
	loginUser = (req: Request, res: Response) => {
		res.json('login user controller');
	};
}
