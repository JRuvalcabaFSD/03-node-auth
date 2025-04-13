import { JwtAdapter } from '../../../config';
import { LoginUserDto } from '../../dtos/auth/login-user.tdo';
import { CustomError } from '../../error/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface LoginToken {
	user: {
		id: string;
		name: string;
		email: string;
	};
	token: string;
}

interface LoginUserUseCase {
	execute(loginUserDto: LoginUserDto): Promise<LoginToken>;
}

type signFunction = (payload: Object, duration?: string) => Promise<string | null>;

export class LoginUser implements LoginUserUseCase {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly signToken: signFunction = JwtAdapter.generateToken
	) {}

	async execute(loginUserDto: LoginUserDto): Promise<LoginToken> {
		const { id, name, email } = await this.authRepository.login(loginUserDto);
		const token = await this.signToken({ id }, '2h');
		if (!token) throw CustomError.internalServer('Error gendering token');

		return {
			token,
			user: { id, name, email },
		};
	}
}
