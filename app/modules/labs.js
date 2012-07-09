define([
  // Global application context.
  "app",

  // Third-party libraries.
  "backbone",
  "bootstrap",
  "less"
],

function(app, Backbone) {
  var Labs = app.module();

  Labs.Views.Main = Backbone.View.extend({
    template: "app/templates/labs",

    render: function(done) {
      var tmpl = app.fetchTemplate(this.template);

      // set the template contents
      this.$el.html(tmpl());
    }
  });

  Labs.Views.About = Backbone.View.extend({
    template: "app/templates/about",

    render: function(done) {
      var tmpl = app.fetchTemplate(this.template);

      // set the template contents
      this.$el.html(tmpl());
    }
  });

  Labs.Views.Experiments = Backbone.View.extend({
    template: "app/templates/experiments",

    render: function(done) {
      var tmpl = app.fetchTemplate(this.template);

      // set the template contents
      this.$el.html(tmpl());
    }
  });

  Labs.Views.Contact = Backbone.View.extend({
    template: "app/templates/contact-us",

    render: function(done) {
      var tmpl = app.fetchTemplate(this.template);

      // set the template contents
      this.$el.html(tmpl());
    }
  });

  Labs.Model = Backbone.Model.extend({});
  Labs.Collection = Backbone.Model.extend({});

  return Labs;
});
