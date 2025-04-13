import { Validators } from '../../../config';

export class LoginUserDto {
	private constructor(public email: string, public password: string) {}

	static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
		if (!object) object = {};
		const { email, password } = object;

		if (!email) return ['Email missing'];
		if (!Validators.email.test(email)) return ['Invalid email'];
		if (!password) return ['Password missing'];

		return [undefined, new LoginUserDto(email, password)];
	}
}
