import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	MONGO_URL: get('MONGO_URL').required().asString(),
	MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
	SECRET_KEY: get('SECRET_KEY').required().asString(),
};
