import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { PutFirstThingsFirsts } from '../api/putFirstThingsFirsts.js';
import './putFirstThingsFirst.html';
 
 Template.putFirstThingsFirst.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.putFirstThingsFirst.events({
  'click .toggle-checked'() {
     Meteor.call('putFirstThingsFirsts.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('putFirstThingsFirsts.remove', this._id);
  },
});