'use strict'

let _ = require('lodash');
let Plan = require('./Plan.js');

class Snapshot {
	constructor(space) {
		this.landscape = {};

		_.forEach(space, data => {
			let attr = data[1] == 'main' ? false : data[2];
			this.landscape[data[0]] = this.landscape[data[0]] || {};
			this.landscape[data[0]][data[1]] = attr;
		});
	}
	rebuild(mains) {
		_.forEach(mains, data => {
			let attr = new Plan(data[2]);
			this.landscape[data[0]][data[1]] = attr;
		});
	}
	find(query) {
		let fields = query[1];
		let length = query[2].length;

		let result = _.reduce(this.landscape, (min, oper, index) => {
			let int = _.reduce(fields, (acc, field) => {
				let x = oper[field];
				return acc ? acc.intersection(x) : x;
			}, false);
			int = int.findSpace(length);

			if(min.value > int) {
				min.value = int;
				min.index = index;
			}

			return min;
		}, {
			value: 1000000,
			index: -1
		});

		result.fields = fields;
		result.length = length;
		return result;
	}
	place(item) {
		let fields = item.fields;
		let point = item.value;
		let length = item.length;
		let index = item.index;
		let oper = this.landscape[index];

		oper.main.pull(point, point + length);
	}
}

module.exports = Snapshot;
