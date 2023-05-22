<h1 align="center"> User management system with express-js, type-orm, bcrypt</h1>

# express-user-management-project

### Requirement
- node-js ( >= 18.16)
- mysql (>= 5.7)

## Getting Started

- Clone this [repo](https://github.com/nanoohlaing1997/express-small-project.git) with http

```
git clone https://github.com/nanoohlaing1997/express-small-project.git
```

- Copy `.env.example` to `.env`
```
cp .env.example .env
```
- Create Database in mysql
```
create database user_management
```

- Create Table in mysql (U can copy from shceme/user.sql)
```
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `users_name_index` (`name`),
  KEY `users_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX name on users (name)
CREATE INDEX email on users (email)
```

- To install dependencies
```
npm install
```

- To run project
```
npm start
```