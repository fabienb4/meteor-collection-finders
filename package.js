Package.describe({
  name: 'fabienb4:collection-finders',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'A simple package to allow you to easily find documents within your collections using `id` or `name`.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/fabienb4/meteor-collection-finders.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.1');

  api.imply('mongo');

  api.use('mongo', ['client', 'server']);

  api.addFiles('collection-finders.js', ['client', 'server']);
});
