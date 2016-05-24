Package.describe({
  'name': 'brucejo75:bootstrap-multiselect',
  'version': '0.0.1',
  'summary': 'Bootstrap Multiselect wrapper for Meteor',
  'git': 'https://github.com/brucejo75/meteor-bootstrap-multiselect.git',
  'documentation': 'README.md'
});

Package.onUse(function onUse(api) {
  api.versionsFrom('1.0');
  api.use(['templating'], 'client');
  api.addFiles([
    'bootstrap-multiselect/dist/js/bootstrap-multiselect.js',
    'bootstrap-multiselect/dist/css/bootstrap-multiselect.css',
    'Multiselect.html',
    'Multiselect.js'
  ], 'client');
});
