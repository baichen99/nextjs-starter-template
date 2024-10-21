## initialize postgres

### manual

```
psql
```

```
CREATE USER myuser WITH PASSWORD 'mypassword';
ALTER USER myuser WITH CREATE CREATEDB CREATEROLE LOGIN;
CREATE DATABASE mydatabase WITH OWNER myuser;
GRANT CONNECT ON DATABASE mydatabase TO myuser;
GRANT CREATE ON DATABASE mydatabase TO myuser;
\q
```
