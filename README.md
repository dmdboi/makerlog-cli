# Makerlog CLI

An unofficial CLI for interacting with Makerlog. Written in Typescript.

## Usage

```bash
// Login using username and password
makerlog login --username [username] --password [password]

// See your current user info
makerlog user

// Add a task to Makerlog
makerlog tasks add --name 'Name of task' --status 'to-do/in-progress/done'

// List your last 10 tasks
makerlog tasks list
```

## Installation

```bash
git clone https://github.com/dmdboi/makerlog-cli
npm ci
npx tsc
npm i -g
```

This will install Makerlog as a global command line tool  

Test it out with:  

```bash
makerlog
```
