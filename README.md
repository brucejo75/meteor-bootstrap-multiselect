## [brucejo75](https://github.com/brucejo75)'s Meteor wrapper for [Bootstrap Multiselect](https://github.com/davidstutz/bootstrap-multiselect)

This is a blatant merge of [emdagon](https://github.com/emdagon/meteor-bootstrap-multiselect)'s [JSSolution](https://github.com/JSSolutions/meteor-bootstrap-multi-select)'s meteor-bootstrap-wrappers. I tried to user the wrappers directly and was immediately stopped by the lack of [documentation](https://github.com/emdagon/meteor-bootstrap-multiselect/issues/1) on the emdagon version.  But I really liked the approach with a content block.  JSSolution provided some better documentation to help me sort out the workings.

So here is my attempt at providing a best of both worlds wrapper along with a little bit of documentation.

You can use Multiselect API but the supplied helper makes it quite easy to use the package.

## Multiselect Block Helper
Here is an example of it in action:
```
  {{#Multiselect name='myMultiselect' menuItems='myMenuItems' selectedList=mySelectedList}}
    <option value="{{value}}" {{selectedAttr}}>{{ caption }}</option>
  {{/Multiselect}}
```
There are 4 arguments to the Multiselect content block:

 - *name* - **required:** this becomes the name of the underlying `<select>`statement.
 - *menuItems* - **required:** this is a list of objects that form the data context for the `<option>` statements.  The option statement will iterate through this list displaying each.  Because it is an object you will need to provide a helper to deliver the *menuItems*.  See the *menuItem* object description below.
 - *selectedList* - **required:** this is a list of the *menuItems* that should be selected at startup.
 - *configOptions* - This is the way you can pass in [multiselect configuration options](http://davidstutz.github.io/bootstrap-multiselect/#configuration-options) and really take advantage of the multiselect package.  These are is optional.

### menuItem object
The menuItem object properties used by the content block.
 - *value* - **required:** this is the value assigned to this *menuItem*.  It is used by the block helper as an index into the `selectedItems` array, so a number or a string work.

That is all the *menuItem* object is required to be, one property.  But you can load up other properties as a convenience, for example the `caption` property is specified in the snippet above.  And you will see with the example that I track the selected state for each *menuItem* in the `selected` property.

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

The sample can be found here: **TBD**...

Enjoy!
