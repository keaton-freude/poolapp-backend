# Pool Tracker Backend

## Description

Backend for the Pool tracker app for tracking pool games between Chris and Keaton. Saves pool game scores, and provides an API
to present interesting and useful statistics, such as a overall game score tracker (each round is played, first to 50 wins). It keeps track of the current game, along with stats such as who broke each game, who was stripes, if they scratched on the 8, etc.

Server is built on nest.js: https://docs.nestjs.com/ using Typescript.

When in doubt about some practice, default to how nestjs does it. Keep everything modularized and easily testable and using Typescript only, unless something is truly impossible in Typescript.

## Installation

```bash
$ npm install
```

## Running the backend

Make sure you edit the start-local.sh script before running it. You need to fill in each of the exported variables, except DATABASE_URL (this will be constructed from the other variables)
You must also install Postgres onto your development machine and do the following:

1. Open pgAdmin 4 and log in to your Postgres installation.
2. Right-Click "Login/Group Roles" and create a new user. Give this user all permissions and allow them to log in.
3. Right-Click "Databases" and create a new Database. Give it any name you like, and make the owner the user you created.

```bash
# Local startup (Bash only, create a .bat if you want windows support, or better yet just use GitBash or Ubuntu Subsystem because CMD & PowerShell both suck)
$ ./start-local.sh
```
