const Task = require('../../models/task');
const Mentor = require('../../models/mentor');
const Student = require('../../models/student');

const { transformTask, singleTask, tasks, mentor, student } = require('./merge');
const { sendEmail } = require('./emails');
const { EMAILS } = require('../../constants/emails');

module.exports = {
  /**
   * Get all students with pre-loaded registeredTask.
   *
   * @throws {Error}
   * @returns {Student[]} - Array of Student objects.
   */
  students: async () => {
    try {
      const students = await Student.find();
      return students.map(student => {
        return {
          ...student._doc,
          uid: "*restricted*",
          registeredTask: singleTask.bind(this, student._doc.registeredTask)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  /**
   * Create student.
   *
   * @param {string} args.studentInput.email
   * @param {string} args.studentInput.uid
   * @throws {Error} if Student already exists.
   * @returns {Student}
   */
  createStudent: async args => {
    try {
      // don't create student if he alredy exists
      const existingStudent = await Student.findOne({
        email: args.studentInput.email,
        uid: args.studentInput.uid
      });
      if (existingStudent) {
        throw new Error('Student with email ' + args.studentInput.email + ' already exists.');
      }
      const student = new Student({
        email: args.studentInput.email,
        uid: args.studentInput.uid,
        registeredTask: null
      });
      const result = await student.save();
      sendEmail(
        student.email,
        EMAILS.USER_REGISTRATION
      );

      return {
        ...result._doc
      };
    } catch (err) {
      throw err;
    }
  },
  /**
   * Get emails of all students.
   * 
   * @throws {Error}
   * @returns {string[]} - Array of emails.
   */
  allStudentEmails: async () => {
    try {
      const students = await Student.find();
      return students.map(student => {
        return student.email;
      });
    } catch (err) {
      throw err;
    }
  }
};
