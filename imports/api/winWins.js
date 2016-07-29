import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const WinWins = new Mongo.Collection('winWins');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('winWins', function winWinsPublication() {
    return WinWins.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'winWins.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    WinWins.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'winWins.remove'(taskId) {
    check(taskId, String);

    const task = WinWins.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    WinWins.remove(taskId);
  },
  'winWins.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = WinWins.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    WinWins.update(taskId, { $set: { checked: setChecked } });
  },
});