const { uuid: uuidv4 } = require("uuid");

class Client {
	constructor(sessionID) {
		// this.token = uuid();
		this.session = sessionID;
		this.user = false;
	}
	update(user) {
		this.user = {
			...this.user,
			...user
		};
	}
}

class Manager {
	constructor() {
		this.clients = new Array();
	}
	session(sessionID) {
		let client = this.clients.find(c => c.session === sessionID);
		if(!client) {
			client = new Client(sessionID);
			this.clients.push(client);
		}
		return client;
	}
}

const manager = new Manager();

module.exports = () => manager;