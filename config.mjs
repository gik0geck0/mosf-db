import loadEnv from 'node-env-file';
import fs from 'fs';
import path from 'path';
import process from 'process';
import url from 'url';

const __dirname = path.dirname(new url.URL(import.meta.url).pathname)
if (fs.existsSync(__dirname + '/.env')) {
	loadEnv(__dirname + '/.env');
}

export default {
	port: process.env.PORT || 8095,
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		database: process.env.DB_DATABASE
	}
};