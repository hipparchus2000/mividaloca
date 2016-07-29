import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const PutFirstThingsFirsts = new Mongo.Collection('putFirstThingsFirsts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('putFirstThingsFirsts', function putFirstThingsFirstsPublication() {
    return PutFirstThingsFirsts.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'putFirstThingsFirsts.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    PutFirstThingsFirsts.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'putFirstThingsFirsts.remove'(taskId) {
    check(taskId, String);

    const task = PutFirstThingsFirsts.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    PutFirstThingsFirsts.remove(taskId);
  },
  'putFirstThingsFirsts.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = PutFirstThingsFirsts.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    PutFirstThingsFirsts.update(taskId, { $set: { checked: setChecked } });
  },
});