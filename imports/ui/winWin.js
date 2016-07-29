import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { WinWins } from '../api/winWins.js';
import './winWin.html';
 
 Template.winWin.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.winWin.events({
  'click .toggle-checked'() {
    Meteor.call('winWins.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('winWins.remove', this._id);
  },
});