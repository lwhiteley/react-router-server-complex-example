import find from 'lodash/find';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (query = {}) => {
  // assume these usernames are in the database
  const db = [
    { user: 'Claudio' },
    { user: 'FoxHound' },
    { user: 'SteveJobs' },
  ];

  return sleep(1500)
  // eslint-disable-next-line
    .then(() => console.log('async call ...'))
    .then(() => find(db, query) || []);
};

