import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Synergizes = new Mongo.Collection('synergizes');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('synergizes', function synergizesPublication() {
    return Synergizes.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'synergizes.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Synergizes.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'synergizes.remove'(taskId) {
    check(taskId, String);

    const task = Synergizes.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Synergizes.remove(taskId);
  },
  'synergizes.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = Synergizes.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Synergizes.update(taskId, { $set: { checked: setChecked } });
  },
});