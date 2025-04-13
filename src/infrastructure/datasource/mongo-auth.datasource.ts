import {
	AuthDatasource,
	CustomError,
	RegisterUserDto,
	UserEntity,
} from '../../domain';

export class MongoAuthDatasource implements AuthDatasource {
	constructor() {}
	async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
		const { name, email, password } = registerUserDto;

		try {
			//TODO
			// 1. verificar correo
			// 2. Has de contraseña
			// 3. Mapear la respuesta a nuestra entidad
			return new UserEntity('1', email, password, ['ADMIN_ROLE']);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer();
		}
	}
}
