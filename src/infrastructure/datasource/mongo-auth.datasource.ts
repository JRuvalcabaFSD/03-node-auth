import { userInfo } from 'os';
import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.tdo';
import { UserMappers } from '../mappers/user.mapper';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class MongoAuthDatasource implements AuthDatasource {
	constructor(
		private readonly hashPassword: HashFunction = BcryptAdapter.hash,
		private readonly comparePassword: CompareFunction = BcryptAdapter.validate
	) {}

	async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
		const { email, password } = loginUserDto;

		try {
			const user = await UserModel.findOne({ email });
			if (!user) throw CustomError.unAuthorized('Invalid credentials');

			const isPasswordValid = this.comparePassword(password, user.password);
			if (!isPasswordValid) throw CustomError.unAuthorized('Invalid credentials');

			return UserMappers.userEntityFromObject(user);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer();
		}
	}

	async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
		const { name, email, password } = registerUserDto;

		try {
			// 1. verificar correo
			const emailExist = (await UserModel.countDocuments({ email })) >= 1;
			if (emailExist) throw CustomError.badRequest('User already exists');

			// 2. Has de contraseña
			const hashPassword = this.hashPassword(password);

			// 3. Crear usuario
			const user = await UserModel.create({ name, email, password: hashPassword });
			await user.save();

			// 3. Mapear la respuesta a nuestra entidad
			return UserMappers.userEntityFromObject(user);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer();
		}
	}
}
