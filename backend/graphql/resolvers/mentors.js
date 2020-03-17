const Task = require('../../models/task');
const Mentor = require('../../models/mentor');
const Student = require('../../models/student');

const { transformTask, singleTask, tasks, mentor, student } = require('./merge');

module.exports = {
  /**
   * Get all mentors with pre-loaded createdTasks.
   * 
   * @returns {Mentor[]} - Array of Mentor objects.
   */
  mentors: async () => {
    try {
      const mentors = await Mentor.find();
      return mentors.map(mentor => {
        return {
          ...mentor._doc,
          uid: "*restricted*",
          createdTasks: tasks.bind(this, mentor._doc.createdTasks)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  /**
   * Create mentor.
   * 
   * @param {string} args.mentorInput.email
   * @param {string} args.mentorInput.uid
   * @returns {Mentor}
   */
  createMentor: async (args) => {
    try {
      // don't create mentor if he alredy exists
      const existingMentor = await Mentor.findOne({
        email: args.mentorInput.email,
        uid: args.mentorInput.uid
      });
      if (existingMentor) {
        throw new Error('Mentor with email ' + args.mentorInput.email + ' already exists.');
      }
      const mentor = new Mentor({
        email: args.mentorInput.email,
        uid: args.mentorInput.uid,
        isVerified: false,
        isAdmin: false
      });
      const result = await mentor.save();
      return {
        ...result._doc
      };
    } catch (err) {
      throw err;
    }
  },
  /**
   * Get emails of students who are registered to 
   * tasks of mentor with mentorId.
   * 
   * @param {ID} args.mentorId
   * @returns {string[]} - Array of emails.
   */
  studentEmails: async (args) => {
    try {
      const mentor = await Mentor.findById(args.mentorId);
      emails = [];

      for (const taskId of mentor.createdTasks) {
        const task = await Task.findById(taskId);

        if (task.registeredStudent) {
          const student = await Student.findById(task.registeredStudent);
          emails.push(student.email);
        }
      }

      return emails;
    } catch (err) {
      throw err;
    }
  },
  /**
   * Get emails of all mentors.
   * 
   * @returns {string[]} - Array of emails.
   */
  allMentorEmails: async () => {
    try {
      const mentors = await Mentor.find();
      return mentors.map(mentor => {
        return mentor.email;
      });
    } catch (err) {
      throw err;
    }
  }
};
