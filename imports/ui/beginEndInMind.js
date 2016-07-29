import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { BeginEndInMinds } from '../api/beginEndInMinds.js';
import './beginEndInMind.html';
 
 Template.beginEndInMind.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.beginEndInMind.events({
  'click .toggle-checked'() {
    Meteor.call('beginEndInMinds.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('beginEndInMinds.remove', this._id);
  },
});