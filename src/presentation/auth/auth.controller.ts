import { Request, Response } from 'express';
import { CustomError, RegisterUser, RegisterUserDto } from '../../domain';
import { MongoAuthRepository } from '../../infrastructure';
import { UserModel } from '../../data';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.tdo';
import { LoginUser } from '../../domain/use-cases/auth/login-user.usecase';

export class AuthController {
	constructor(private readonly authRepository: MongoAuthRepository) {}

	private handleError(error: unknown, res: Response): void {
		if (error instanceof CustomError) {
			res.status(error.httpCode).json({ error: error.message });
			return;
		}

		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}

	registerUser = (req: Request, res: Response) => {
		const [error, data] = RegisterUserDto.create(req.body);
		if (error) {
			this.handleError(CustomError.badRequest(error), res);
			return;
		}

		new RegisterUser(this.authRepository)
			.execute(data!)
			.then(data => res.status(201).json(data))
			.catch(err => this.handleError(err, res));
	};

	loginUser = (req: Request, res: Response) => {
		const [error, data] = LoginUserDto.create(req.body);
		if (error) {
			this.handleError(CustomError.badRequest(error), res);
			return;
		}

		new LoginUser(this.authRepository)
			.execute(data!)
			.then(data => res.json(data))
			.catch(err => this.handleError(err, res));
	};

	getUser = (req: Request, res: Response) => {
		UserModel.find()
			.then(users => res.json({ user: req.body.user }))
			.catch(error => res.status(500).json({ error: 'Internal server error' }));
	};
}
