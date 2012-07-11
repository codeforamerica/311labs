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

    events: {
      "click #submit-email-city": _handleUserContactInfoClickEvent,
      "click #submit-email": _handleUserContactInfoClickEvent
    }

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
    },

    events: {
      "click #submit-email": _handleUserContactInfoClickEvent
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
    },

    events: {
        "click #submit-email": _handleUserContactInfoClickEvent,
        "click .experimentsnav li": _handleExperimentNavigationClickEvent
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
      "click #submit-email-city-note": _handleUserContactInfoClickEvent
    }
  });

  /*
   * Model to hold names, emails, cities of interested party.
   */
  Labs.IndicationOfInterest = Backbone.Model.extend({
    // override to package attributes in a document for MongoHA
    toJSON: function() {
      return {"document": this.attributes};
    },

    // override to specify post URL for this object
    sync: function(method, model, options) {
      options.url = "https://api.mongohq.com/databases/chicago/collections/interest/documents?_apikey=i0h95kvp3dyx14hvw9bl";
      return Backbone.sync(method, model, options);
    }
  });

  /*
   * Common code used for rendering all views.
   */
  function _setTemplates(tmpl, view) {
    // set the template contents
    view.$el.html(tmpl());
    // inject modal template for contact information responses
    var contactModalTempl = app.fetchTemplate("app/templates/_contact-modal");
    $(view.el).append(contactModalTempl);
  }

  /*
   * Utilities for saving form data.
   */
  function _captureUserContactInfo(data) {
    // guard / validation
    if(data.type === "submit-email-city-note" || data.type === "submit-email-city") { 
      if (data.emailAddress === "" || data.city === "")
        return;
    }
    if(data.type === "submit-email") { 
      if (data.emailAddress === "")
        return;
    }

    // create indication of interest model and save
    var ioi = new Labs.IndicationOfInterest({
          "emailAddress": data.emailAddress,
          "city": data.city,
          "note": data.note
        }).save();
    
    // show modal
    $("#contact-modal").modal('toggle');
  }

  function _handleUserContactInfoClickEvent(e) {
    // get data elements from submitting form
    var emailAddress = $('#emailAddress', e.srcElement.form).val();
    var city = $('#city', e.srcElement.form).val();
    var note = $('#note', e.srcElement.form).val();

    // package data elements and pass to capture
    var data = {
      "type": e.currentTarget.id,
      "emailAddress": emailAddress,
      "city": city,
      "note": note
    };
    _captureUserContactInfo(data);
  }

  function _handleExperimentNavigationClickEvent(e){
      var id = $(e.target).attr("id").split("-")[1];
      $(".experiments:visible").fadeOut("slow", function(){
          $("#experiment-"+id).fadeIn();
      });
      $("ul.experimentsnav li").removeClass("selected");
      $(e.target).addClass("selected");
  }


  return Labs;
});
