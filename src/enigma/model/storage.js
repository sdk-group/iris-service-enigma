let Snapshot = require("./Snapshot.js");


class Storage {
	constructor() {
		this.space = [];
		this.stored_queries = [];
		this.last_time = 0;
		this.snap_time = 0;
		this.mains = [];
	}
	addSpace(...data) {
		let attr = data[1] == 'main' ? data[2] : new Plan(data[2])
		if(data[1] == 'main') this.mains.push(data);
		this.space.push([data[0], data[1], attr]);
	}
	find(query) {
		let snap = this.buildSnapshot();
		return snap.find(query);
	}
	place(query) {
		let snap = this.buildSnapshot();
		let result = snap.find(query);
		if(result) {
			snap.place(result);
			this.stored_queries.push(query);
		}

		return result;
	}
	buildSnapshot() {
		// if (this.snap) return this.snap;

		let time = process.hrtime();
		let snap = this.snap || new Snapshot(this.space);
		this.snap = snap;
		snap.rebuild(this.mains);
		let diff = process.hrtime(time);
		this.snap_time = this.snap_time + diff[0] * 1e9 + diff[1];

		time = process.hrtime();
		_.forEach(this.stored_queries, query => {
			let item = snap.find(query);
			snap.place(item)
		});

		diff = process.hrtime(time);
		this.last_time = this.last_time + diff[0] * 1e9 + diff[1];

		return snap;
	}
}

module.exports = Storage;
