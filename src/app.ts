import { envs } from './config';
import { Server } from './presentation/server';

(async () => {
	await main();
})();

async function main() {
	const server = new Server({ port: envs.PORT });
	server.start();
}
