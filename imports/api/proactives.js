import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Proactives = new Mongo.Collection('proactives');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('proactives', function proactivesPublication() {
    return Proactives.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'proactives.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Proactives.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'proactives.remove'(taskId) {
    check(taskId, String);
 
    const task = Proactives.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Proactives.remove(taskId);
  },
  'proactives.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Proactives.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    Proactives.update(taskId, { $set: { checked: setChecked } });
  },
});