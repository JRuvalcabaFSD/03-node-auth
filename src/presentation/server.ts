import express, { Application } from 'express';

interface Options {
	port?: number;
}

export class Server {
	public readonly app: Application = express();
	private readonly port: number;

	constructor(options: Options) {
		const { port = 3000 } = options;
		this.port = port;
	}

	async start() {
		this.app.listen(this.port, () => {
			console.log(`Server running in port ${this.port}`);
		});
	}
}
