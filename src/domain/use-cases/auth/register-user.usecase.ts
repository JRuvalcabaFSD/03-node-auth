import { JwtAdapter } from '../../../config';
import { RegisterUserDto } from '../../dtos/auth/registerUser.dto';
import { CustomError } from '../../error/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface UserToken {
	user: {
		id: string;
		name: string;
		email: string;
	};
	token: string;
}

interface RegisterUserUseCase {
	execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

type signFunction = (payload: Object, duration?: string) => Promise<string | null>;

export class RegisterUser implements RegisterUserUseCase {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly signToken: signFunction = JwtAdapter.generateToken
	) {}

	async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
		const { id, name, email } = await this.authRepository.register(registerUserDto);
		const token = await this.signToken({ id }, '2h');
		if (!token) throw CustomError.internalServer('error generating token');

		return {
			user: { id, name, email },
			token: token,
		};
	}
}
