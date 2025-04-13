import { sign, SignOptions } from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {
	static async generateToken(payload: Object, duration: string = '2h'): Promise<string | null> {
		return new Promise(res => {
			sign(payload, envs.SECRET_KEY, { expiresIn: duration } as SignOptions, (err, token) => {
				if (err) return res(null);
				res(token!);
			});
		});
	}
}
