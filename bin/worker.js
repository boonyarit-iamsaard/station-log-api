#! /app/.heroku/node/bin/node
function currentDate() {
  return new Date();
}

function scheduler() {
  console.log('Scheduled on ' + currentDate());
}

scheduler();

process.exit();
