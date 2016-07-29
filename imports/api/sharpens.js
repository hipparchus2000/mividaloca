import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Sharpens = new Mongo.Collection('sharpens');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('sharpens', function sharpensPublication() {
    return Sharpens.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'sharpens.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Sharpens.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'sharpens.remove'(taskId) {
    check(taskId, String);
 
    const task = Sharpens.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Sharpens.remove(taskId);
  },
  'sharpens.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Sharpens.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    Sharpens.update(taskId, { $set: { checked: setChecked } });
  },
});