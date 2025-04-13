import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.tdo';

export class MongoAuthRepository implements AuthRepository {
	constructor(private readonly authDatasource: AuthDatasource) {}
	login(loginUserDto: LoginUserDto): Promise<UserEntity> {
		return this.authDatasource.login(loginUserDto);
	}

	register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
		return this.authDatasource.register(registerUserDto);
	}
}
