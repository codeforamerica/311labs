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

    initialize: function(options) {
      this.render();
    },

    render: function() {
      var tmpl = app.fetchTemplate(this.template);
      _setTemplates(tmpl, this);

      return this;
    },

    events: {}
  });

  Labs.Views.About = Backbone.View.extend({
    template: "app/templates/about",

    initialize: function(options) {
      this.render();
    },

    render: function(done) {
      var tmpl = app.fetchTemplate(this.template);
      _setTemplates(tmpl, this);

      return this;
    }
  });

  Labs.Views.Experiments = Backbone.View.extend({
    template: "app/templates/experiments",

    initialize: function(options) {
      this.render();
    },

    render: function(done) {
      var tmpl = app.fetchTemplate(this.template);
      _setTemplates(tmpl, this);

      return this;
    }
  });

  Labs.Views.Contact = Backbone.View.extend({
    template: "app/templates/contact-us",

    initialize: function(options) {
      this.render();
    },

    render: function(done) {
      var tmpl = app.fetchTemplate(this.template);
      _setTemplates(tmpl, this);

      return this;
    },

    events: {
      "click #submit-email-city-note": function(e) {
        var emailAddress = $('#emailAddress').val();
        var city = $('#city').val();
        var note = $('#note').val();
        var data = {
          "type": "submit-email-city-note",
          "emailAddress": emailAddress,
          "city": city,
          "note": note
        };
        _captureUserContactInfo(data);
      }
    }
  });

  Labs.Model = Backbone.Model.extend({});
  Labs.Collection = Backbone.Model.extend({});

  /*
   * Common code used for rendering all views.
   */
  function _setTemplates(tmpl, view) {
    // set the template contents
    view.$el.html(tmpl());
    // inject modal template for contact information responses
    var contactModalTempl = app.fetchTemplate("app/templates/_contact-model");
    $(view.el).append(contactModalTempl);
  }

  /*
   * Utilities for saving form data.
   */
  function _captureUserContactInfo(data) {
    console.log(data);
    // guard / validation
    if(data.type === "submit-email-city-note") {
      if (data.emailAddress === "" || data.city === "")
        return;
    }
    // save
    // XXX: TODO
    
    // show modal
    $("#contact-modal").modal('toggle');
  }

  return Labs;
});
