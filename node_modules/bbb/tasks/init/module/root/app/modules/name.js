define([
  // Global application context.
  "app",

  // Third-party libraries.
  "backbone"
],

function(app, Backbone) {
  var {%= module_name %} = app.module();

  {%= module_name %}.Model = Backbone.Model.extend({});
  {%= module_name %}.Collection = Backbone.Model.extend({});

  return {%= module_name %};
});
