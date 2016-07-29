import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { Proactives } from '../api/proactives.js';
import './proactive.html';
 
 Template.proactive.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.proactive.events({
  'click .toggle-checked'() {
    Meteor.call('proactives.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('proactives.remove', this._id);
  },
});