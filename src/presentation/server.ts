import express, { Application, Router } from 'express';

interface Options {
	port?: number;
	routes: Router;
}

export class Server {
	public readonly app: Application = express();
	private readonly port: number;
	private readonly routes: Router;

	constructor(options: Options) {
		const { port = 3000, routes } = options;
		this.port = port;
		this.routes = routes;
	}

	async start() {
		//Middlewares
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		// Routes
		this.app.use(this.routes);
		this.app.listen(this.port, () => {
			console.log(`Server running in port ${this.port}`);
		});
	}
}
