import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const BeginEndInMinds = new Mongo.Collection('beginEndInMinds');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('beginEndInMinds', function beginEndInMindsPublication() {
    return BeginEndInMinds.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'beginEndInMinds.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    BeginEndInMinds.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'beginEndInMinds.remove'(taskId) {
    check(taskId, String);

    const task = BeginEndInMinds.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    BeginEndInMinds.remove(taskId);
  },
  'beginEndInMinds.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = BeginEndInMinds.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    BeginEndInMinds.update(taskId, { $set: { checked: setChecked } });
  },
});
