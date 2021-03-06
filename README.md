## Note: I stopped using this
I found this solution before I understood how to user things like [bootstrap-select](https://silviomoreto.github.io/bootstrap-select/) directly in my html.  I recommend not using this.  It is too complex and pretty limited.  I will delete this in 6 months or so.

## [brucejo75](https://github.com/brucejo75)'s Meteor wrapper for [Bootstrap Multiselect](https://github.com/davidstutz/bootstrap-multiselect)

This is a blatant merge of [emdagon](https://github.com/emdagon/meteor-bootstrap-multiselect)'s and  [JSSolution](https://github.com/JSSolutions/meteor-bootstrap-multi-select)'s meteor-bootstrap-wrappers. I tried to use the wrappers directly and was immediately stopped by the lack of [documentation](https://github.com/emdagon/meteor-bootstrap-multiselect/issues/1) on the emdagon version.  But I really liked the approach with a content block.  JSSolution provided some better documentation to help me sort out the workings.

So here is my attempt at providing a best of both worlds wrapper along with a little bit of documentation.

You can use Multiselect API but the supplied helper makes it quite easy to use the package.

## Multiselect Block Helper
Here is an example of it in action:
```
  {{#Multiselect name='myMultiselect' menuItems='myMenuItems' selectedList=mySelectedList radio=true}}
    <option value="{{value}}" {{selectedAttr}}>{{ caption }}</option>
  {{/Multiselect}}
```
There are 4 arguments to the Multiselect content block:

 - *name* - **required:** this becomes the name of the underlying `<select>`statement.
 - *menuItems* - **required:** this is a list of objects that form the data context for the `<option>` statements.  The template will iterate through this list displaying the option element setting the context equal to the object you define.  Because it is an object you will need to provide a helper to deliver the *menuItems*.  See the *menuItem* object description below.
 - *selectedList* - **required:** this is a list of the values of the *menuItems* that should be selected at startup.
 - *configOptions* - **optional:** This is the way you can pass in [multiselect configuration options](http://davidstutz.github.io/bootstrap-multiselect/#configuration-options) and really take advantage of the multiselect package.  These are optional.
 - *radio* - **optional:** set this to true if you want single select radio buttons instead of multi-select check boxes.

### menuItem object
The menuItem object properties used by the content block.
 - *value* - **required:** this is the value assigned to this *menuItem*.  It is used by the block helper as an index into the `selectedItems` array, so a number or a string work.

That is all the *menuItem* object is required to be, one property.  But you can load up other properties as a convenience, for example the `caption` property is specified in the snippet above.  And you will see with the example that I track the selected state for each *menuItem* in the `selected` property.

### selectedAttr variable
This is a convenience variable provided by the content block.  Internally, it calculates whether this should be `'selected'` or `''` depending upon the values in the `selectedList` at startup.  After startup, jQuery takes care of setting the `'selected'` attribute.

## Put it all together

Here is an example template that shows how the Multiselect content block is used.

```
<template name="msExample">
  {{#Multiselect name='example-multiple-selected' menuItems=myMenuItems selectedList=mySelectedList configOptions=myConfigOptions}}
    <option value={{value}} {{selectedAttr}}>{{caption}}</option>
  {{/Multiselect}}
</template>
```

I have named my selection `'example-multiple-selected'`.
I need to provide some helpers for `myMenuItems`, `mySelectedList` and my `ConfigOptions`.

Here are the template functions for the sample:
```
let arr = [];
for(let i = 0; i < 6; i++) {
  let obj = {};
  obj.value = 'Value' + i;
  obj.caption = 'Option ' + i;
  obj.selected = false;
  arr[i] = obj;
}

Template.msExample.helpers({
  'myMenuItems': function selectedItems() {
    return arr;
  },
  'mySelectedList': function selectedList() {
    let retVal = arr.filter(function aFilter(elem) {return elem.selected;})
    .map(function aMap(elem) {return elem.value;});
    return retVal ? retVal : [];
  },
  'myConfigOptions': function configOptions() {
    return {
      'nonSelectedText': 'Check option',
      'buttonClass': 'btn btn-primary',
      'onChange': function onChange(option, checked) {
        let index = $(option).val();
        console.log('Changed option ' + index + '. checked: ' + checked);
        arr.indexOf(index).selected = checked;
      }
    };
  }
});

```

The sample can be found here: **[here](https://github.com/brucejo75/meteor-bootstrap-multiselect-sample)**

Enjoy!
