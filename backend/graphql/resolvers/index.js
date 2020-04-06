const authResolver = require('./auth');
const tasksResolver = require('./tasks');
const mentorsResolver = require('./mentors');
const studentsResolver = require('./students');
const adminsResolver = require('./admins');
const emailsResolver = require('./emails');

/**
 * Connects all graphql resolvers
 */
const rootResolver = {
  ...authResolver,
  ...tasksResolver,
  ...mentorsResolver,
  ...studentsResolver,
  ...adminsResolver,
  ...emailsResolver
};

module.exports = rootResolver;
