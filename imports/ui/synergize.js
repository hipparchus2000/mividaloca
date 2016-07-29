import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { Synergizes } from '../api/synergizes.js';
import './synergize.html';
 
 Template.synergize.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.synergize.events({
  'click .toggle-checked'() {
    Meteor.call('synergizes.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('synergizes.remove', this._id);
  },
});