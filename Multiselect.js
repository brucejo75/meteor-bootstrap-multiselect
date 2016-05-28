Template.Multiselect.onRendered(function multiselectOnRendered() {
  let template = this;
  let config = {};
  if(template.data.configOptions) {
    config = template.data.configOptions;
  }

  // autorun waits until after the dependent data has been updated
  template.autorun(function multiselectAutorun() {
    Template.currentData();
    // afterFlush waits until the rest of the DOM elements have been built
    Tracker.afterFlush(function multiselectAfterFlush() {
      if(template.data.menuItems.length > 0) {
        // Finally ready to initialize the multiselect
        // e.g. after #each has completed creating all elements
        template.$('select').multiselect(config);
      }
    });
  });
});

Template.Multiselect.helpers({
  'args': function args() {
    data = Template.instance().data;
    selected = false;
    if(data.selectedList instanceof Array) {
      selected = Boolean(data.selectedList.indexOf(this.value) > -1 );
    } else {
      selected = this.value === data.selectedList;
    }
    return _.extend({}, this, {'selectedAttr': selected ? 'selected' : ''});
  }
});
