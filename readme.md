# Dynamic Database as a Service

Fully virtualized to make it easier than ever to create a schema for an app

# Requirements
Declarative schema
Auto-migration
- Add new field -> no loss in data
- Edit/Remove field -> automatically delete that data
- Delete object -> delete all records
- Basically, a fancy & live ORM

# Random Ideas
## Declarative SQL?
DECLARE TABLE <name> FIELDS <normal postgres syntax>;
- table schema diff -> apply ?
- common-table approach (known perf limitations)
- - unpack into SQL DDL
	

# Terminology
Object =>	vtable
Record =>	vrow
