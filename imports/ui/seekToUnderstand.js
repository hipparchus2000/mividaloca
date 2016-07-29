import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { SeekToUnderstands } from '../api/seekToUnderstands.js';
import './seekToUnderstand.html';

Template.seekToUnderstand.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.seekToUnderstand.events({
  'click .toggle-checked'() {
    Meteor.call('seekToUnderstands.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('seekToUnderstands.remove', this._id);
  },
});