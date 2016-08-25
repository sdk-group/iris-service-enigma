'use strict'

let events = {
	enigma_box: {}
};

let tasks = [];


module.exports = {
	module: require('./enigma.js'),
	permissions: [],
	exposed: true,
	tasks: tasks,
	events: {
		group: 'enigma',
		shorthands: events.enigma_box
	}
};