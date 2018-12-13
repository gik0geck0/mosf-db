CREATE TABLE IF NOT EXISTS vapp (
	id serial,
	name varchar(16)
);

CREATE TABLE IF NOT EXISTS vtable (
	id serial,
	appId integer,
	name varchar(16)
);

CREATE TABLE IF NOT EXISTS vfield (
	id serial,
	appId integer,
	vtableId integer,
	name varchar(16),
	datatype varchar(16)
);

CREATE TABLE IF NOT EXISTS vrow (
	id serial,
	appId integer,
	vtableId integer,
	vfieldId integer,
	data text
);
