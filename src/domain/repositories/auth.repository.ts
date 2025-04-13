import { RegisterUserDto } from '../dtos/auth/registerUser.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthRepository {
	//TODO
	// abstract login();
	abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
