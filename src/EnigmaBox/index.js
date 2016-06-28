'use strict'

let events = {
	enigma_box: {}
};

let tasks = [];


module.exports = {
	module: require('./enigma-box.js'),
	permissions: [],
	exposed: true,
	tasks: tasks,
	events: {
		group: 'enigma-box',
		shorthands: events.enigma_box
	}
};