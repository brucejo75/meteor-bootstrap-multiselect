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

        // If data has updated refresh the multiselect
        if(template.selector) {
          template.selector.multiselect('refresh');
        } else {
          template.selector = template.selector || template.$('select');
          template.selector.multiselect(config);
        }
      }
    });
  });
});

Template.Multiselect.helpers({
  'args': function args() {
    let template = Template.instance();
    let data = template.data;
    let selected = false;
    if(data.selectedList instanceof Array) {
      selected = Boolean(data.selectedList.indexOf(this.value) > -1 );
    } else {
      selected = this.value === data.selectedList;
    }

    // if multiselect is initiliazed then any data changes will
    // need to update the multiselect internal data
    if(template.selector) {
      if(selected) {
        template.selector.multiselect('select', this.value);
      } else {
        template.selector.multiselect('deselect', this.value);
      }
    }
    return _.extend({}, this, {'selectedAttr': selected ? 'selected' : ''});
  }
});
