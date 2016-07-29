import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const SeekToUnderstands = new Mongo.Collection('seekToUnderstands');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('seekToUnderstands', function seekToUnderstandsPublication() {
    return SeekToUnderstands.find(
        { owner: this.userId }
    );
  });
}


Meteor.methods({
  'seekToUnderstands.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    SeekToUnderstands.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'seekToUnderstands.remove'(taskId) {
    check(taskId, String);
 
    const task = SeekToUnderstands.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    SeekToUnderstands.remove(taskId);
  },
  'seekToUnderstands.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = SeekToUnderstands.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    SeekToUnderstands.update(taskId, { $set: { checked: setChecked } });
  },
});