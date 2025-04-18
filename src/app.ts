import { envs } from './config';
import { MongoDatabase } from './data';
import { AppRoutes } from './presentation/app.routes';
import { Server } from './presentation/server';

(async () => {
	await main();
})();

async function main() {
	await MongoDatabase.connect({ dbName: envs.MONGO_DB_NAME, mongoUrl: envs.MONGO_URL });
	new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
}
