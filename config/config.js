module.exports = {
  "development": {
    "username": "admin",
    "password": "admin",
    "database": "user-accounts-dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "user-accounts-test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "user-accounts-prod",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
