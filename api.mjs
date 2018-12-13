
import express from 'express';
const router = express.Router()
export default router;

import Pg from 'pg';
import config from './config';

const db = new Pg.Client(config.db);
db.connect(onDbConnected, db);

function onDbConnected(dbErr, db) {
	if (dbErr) {
		console.error('connection error', dbErr.stack);
		return;
	}
	console.log("Connected to db!");

	/* COMMON */
	function sendJson(res, obj) {
		res.send(JSON.stringify(obj) + "\n");
	}

	/** APPS **/

	router.get('/app', (req, res) => {
		getApps().then((appList) => {
			sendJson(res, appList);
		});
	});
	function getApps() {
		return db.query("SELECT id, name FROM vapp").then((data) => {
			return data.rows;
		});
	}

	router.post('/app/:appName', (req, res) => {
		const appName = req.params.appName;
		createApp(appName).then((appData) => {
			sendJson(res, appData);
		});
	});
	function createApp(appName) {
		return db.query({
			name: "create-app",
			text: "INSERT INTO vapp ( name ) VALUES ( $1::text )",
			values: [ appName ],
			rowMode: 'array'
		}).then((response) => {
			return getAppByName(appName);
		});
	}

	router.get('/app/:appName', (req, res) => {
		const appName = req.params.appName;
		getAppByName(appName).then((appData) => {
			sendJson(res, appData);
		});
	});
	function getAppByName(appName) {
		return db.query("SELECT id, name FROM vapp WHERE name= $1::text LIMIT 1", [ appName ]).then((data) => {
			return data.rows[0];
		});
	}

	/** VTABLES **/

	router.get('/app/:appName/vtable', (req, res) => {
		getVTables(req.params.appName).then((appSchema) => {
			sendJson(res, appSchema);
		});
	});
	function getVTables(appName) {
		return db.query("SELECT vtable.id, vtable.appId, vtable.name FROM vtable INNER JOIN vapp ON vtable.id = vtable.appId  WHERE vapp.name = $1::text", [ appName ]).then((data) => {
			return data.rows;
		});
	}

	router.post('/app/:appName/vtable/:vtableName', (req, res) => {
		createVTable(req.params.appName, req.params.vtableName).then((vtableData) => {
			sendJson(res, vtableData);
		});
	});
	function createVTable(appName, vtableName) {
		return getAppByName(appName).then((appData) => {
			return db.query("INSERT INTO vtable ( appId, name ) VALUES ( $1::integer, $2::text )", [ appData.id, vtableName ]).then((response) => {
				return getVTableByName(appName, vtableName);
			});
		});
	}

	router.get('/app/:appName/vtable/:vtableName', (req, res) => {
		getVTableByName(req.params.appName, req.params.vtableName).then((vtableData) => {
			sendJson(res, vtableData);
		});
	});
	function getVTableByName(appName, vtableName) {
		return db.query("SELECT vtable.id, vtable.appId, vtable.name FROM vtable INNER JOIN vapp ON vtable.id = vtable.appId WHERE  vapp.name = $1::text AND vtable.name = $2::text LIMIT 1", [ appName, vtableName ]).then((data) => {
			return data.rows[0];
		});
	}

	/** VFIELDS **/
	// TODO
	function getVTableWithSchema(appName, vtableName) {
		return db.query("SELECT vfield.id, vfield.name, vfield.name, vfield.datatype, vtable.id AS, vtable.appId, vtable.name FROM vtable INNER JOIN vapp ON vtable.id = vtable.appId WHERE  vapp.name = $1::text AND vtable.name = $2::text LIMIT 1", [ appName, vtableName ]).then((data) => {
			return data.rows[0];
		});
	}
}