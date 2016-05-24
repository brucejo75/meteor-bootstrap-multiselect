
Template.Multiselect.onRendered(function() {
  let template = this;
  let config = {};
  if(template.data.configOptions) {
    config = template.data.configOptions;
  }

  this.$('select').multiselect(config);
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

