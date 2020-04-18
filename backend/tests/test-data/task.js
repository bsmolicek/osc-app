const mongoose = require('mongoose');

/**
 * Testing array of Tasks
 */
const TASKS = [{
  title: 'Task-1',
  details: 'AAA',
  link: null,
  isSolved: false,
  isBeingSolved: false,
  creator: mongoose.Types.ObjectId(),
  registeredStudent: null
}, {
  title: 'Task-2',
  details: 'BBB',
  link: 'https://www.google.com',
  isSolved: false,
  isBeingSolved: false,
  creator: mongoose.Types.ObjectId(),
  registeredStudent: null
}, {
  title: 'Task-3',
  details: 'CCC',
  link: null,
  isSolved: false,
  isBeingSolved: false,
  creator: mongoose.Types.ObjectId(),
  registeredStudent: null
}];

/**
 * Testing args with non-existing taskInput
 */
const NEX_ARGS = {
  taskInput: {
    title: "Difficult task",
    details: "Create automated test to test suite."
  }
};

exports.TASKS = TASKS;
exports.NEX_ARGS = NEX_ARGS;