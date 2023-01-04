# Makerlog CLI

An unofficial CLI for interacting with Makerlog. Written in Typescript.

## Usage

```bash
// Login using username and password
makerlog login --username [username] --password [password]

// See your current user info
makerlog user

// Add a completed task to Makerlog
makerlog done 'Name of task'

// Add an in-progress task to Makerlog
makerlog inprogress 'Name of task'

// Add a task todo to Makerlog
makerlog todo 'Name of task'

// Show unread notifications
makerlog notifications list

// Mark all unread notifications as read
makerlog notifications read

// List your last 10 tasks
makerlog tasks
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
