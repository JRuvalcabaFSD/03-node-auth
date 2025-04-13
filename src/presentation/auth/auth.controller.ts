import { Request, Response } from 'express';
import { CustomError, RegisterUser, RegisterUserDto } from '../../domain';
import { MongoAuthRepository } from '../../infrastructure';
import { UserModel } from '../../data';

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

		new RegisterUser(this.authRepository)
			.execute(data!)
			.then(data => res.status(201).json(data))
			.catch(err => this.handleError(err, res));
	};

	loginUser = (req: Request, res: Response) => {
		res.json('login user controller');
	};
	getUser = (req: Request, res: Response) => {
		UserModel.find()
			.then(users => res.json({ user: req.body.user }))
			.catch(error => res.status(500).json({ error: 'Internal server error' }));
	};
}
