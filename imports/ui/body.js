import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { BeginEndInMinds } from '../api/beginEndInMinds.js';
import { Proactives } from '../api/proactives.js';
import { PutFirstThingsFirsts } from '../api/putFirstThingsFirsts.js';
import { SeekToUnderstands } from '../api/seekToUnderstands.js';
import { Sharpens } from '../api/sharpens.js';
import { Synergizes } from '../api/synergizes.js';
import { WinWins } from '../api/winWins.js';


import './beginEndInMind.js';
import './proactive.js';
import './putFirstThingsFirst.js';
import './seekToUnderstand.js';
import './sharpen.js';
import './synergize.js';
import './winWin.js';

import './body.html';
 
Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('beginEndInMinds');
  Meteor.subscribe('proactives');
  Meteor.subscribe('putFirstThingsFirsts');
  Meteor.subscribe('seekToUnderstands');
  Meteor.subscribe('sharpens');
  Meteor.subscribe('synergizes');
  Meteor.subscribe('winWins');
  Meteor.subscribe('export');
  
  this.state = new ReactiveDict();
});

Template.body.helpers({
  beginEndInMinds() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return BeginEndInMinds.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return BeginEndInMinds.find({}, { sort: { createdAt: -1 } });
  },
  proactives() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return Proactives.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return Proactives.find({}, { sort: { createdAt: -1 } });
  },
  putFirstThingsFirsts() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return PutFirstThingsFirsts.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return PutFirstThingsFirsts.find({}, { sort: { createdAt: -1 } });
  },
  seekToUnderstands() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return SeekToUnderstands.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return SeekToUnderstands.find({}, { sort: { createdAt: -1 } });
  },
  sharpens() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return Sharpens.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return Sharpens.find({}, { sort: { createdAt: -1 } });
  },
  synergizes() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return Synergizes.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return Synergizes.find({}, { sort: { createdAt: -1 } });
  },
  winWins() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return WinWins.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return WinWins.find({}, { sort: { createdAt: -1 } });
  }

});


Template.body.events({
  'submit .new-beginEndInMind'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('beginEndInMinds.insert', text);
	// Clear form
    target.text.value = '';
  },
 
  'submit .new-proactive'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('proactives.insert', text);
	// Clear form
    target.text.value = '';
	},
    
	'submit .new-putFirstThingsFirst'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('putFirstThingsFirsts.insert', text);
	// Clear form
    target.text.value = '';
	},

      'submit .new-seekToUnderstand'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('seekToUnderstands.insert', text);
	// Clear form
    target.text.value = '';
	},

    'submit .new-sharpen'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('sharpens.insert', text);  
	// Clear form
    target.text.value = '';
	},

    'submit .new-synergize'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('synergizes.insert', text);
	// Clear form
    target.text.value = '';
	},

	'submit .new-winWin'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('winWins.insert', text);

	// Clear form
    target.text.value = '';
	},
  'change .hide-archived input'(event, instance) {
    instance.state.set('hideArchived', event.target.checked);
  },


});

