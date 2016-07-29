import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { Sharpens } from '../api/sharpens.js';
import './sharpen.html';
 
Template.sharpen.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.sharpen.events({
  'click .toggle-checked'() {
    Meteor.call('sharpens.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('sharpens.remove', this._id);
  },
});