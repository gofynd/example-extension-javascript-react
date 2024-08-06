const concurrently = require('concurrently');
require('dotenv').config({ path: './.env' });

const nodeServerCommand = 'npm run start:dev';
const viteCommand = 'npm run dev';

const { result } = concurrently([
  { command: nodeServerCommand, name: 'backend', prefixColor: 'blue' },
  { command: viteCommand, name: 'frontend', prefixColor: 'green', cwd: 'frontend' }
],{
  killOthers: ['failure'],
  restartTries: 3
});

result.then(success, failure);

function success() {
  console.log('All processes exited successfully');
}

function failure() {
  console.error('One or more processes failed');
}