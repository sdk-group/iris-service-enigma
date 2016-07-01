'use strict'


let ServiceApi = require('resource-management-framework')
	.ServiceApi;

class EnigmaBox {
	constructor() {
		this.emitter = message_bus;
	}

	init(cfg) {
		this.services = new ServiceApi();
		this.services.initContent();
	}

	launch() {
		return Promise.resolve(true);
	}

}

module.exports = EnigmaBox;