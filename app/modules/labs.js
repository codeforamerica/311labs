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
      "click #submit-email": _handleUserContactInfoClickEvent,
      "click #confirm-submission": _clearFields
    }

  });

  Labs.Views.About = Backbone.View.extend({
    template: "app/templates/about",

    initialize: function(options) {
      this.render();
      $(this.el).find("ul.nav li.about").addClass("selected");
    },

    render: function(done) {
      var tmpl = app.fetchTemplate(this.template);
      _setTemplates(tmpl, this);

      return this;
    },

    events: {
      "click #submit-email": _handleUserContactInfoClickEvent,
      "click #confirm-submission": _clearFields
    }
  });

  Labs.Views.Experiments = Backbone.View.extend({
    template: "app/templates/experiments",

    initialize: function(options) {
      this.render();
      $(this.el).find("ul.nav li.experiments").addClass("selected");
    },

    render: function(done) {
      var tmpl = app.fetchTemplate(this.template);
      _setTemplates(tmpl, this);
      
      return this;
    },

    events: {
      "click #submit-email": _handleUserContactInfoClickEvent,
      "click #confirm-submission": _clearFields,
      "click .experimentsnav li": _handleExperimentNavigationClickEvent
    }
  });

  Labs.Views.Contact = Backbone.View.extend({
    template: "app/templates/contact-us",

    initialize: function(options) {
      this.render();
      $(this.el).find("ul.nav li.contactus").addClass("selected");
    },

    render: function(done) {
      var tmpl = app.fetchTemplate(this.template);
      _setTemplates(tmpl, this);

      return this;
    },

    events: {
      "click #submit-email-city-note": _handleUserContactInfoClickEvent,
      "click #submit-email": _handleUserContactInfoClickEvent,
      "click #confirm-submission": _clearFields
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
    var headerTempl = app.fetchTemplate("app/templates/_header");
    $(view.el).prepend(headerTempl);
    var contactModalTempl = app.fetchTemplate("app/templates/_contact-modal");
    $(view.el).append(contactModalTempl);
  }

  /*
   * Utilities for saving form data.
   */

  var emailAddress = null;
  var city = null;
  var note = null;

  function _captureUserContactInfo(data) {
    // guard / validation
    if(data.type === "submit-email-city-note" || data.type === "submit-email-city") { 
      // form says that required values are not valid; eject
      if (!data.emailAddress[0].validity.valid || !data.city[0].validity.valid)
        return;
      
    }
    if(data.type === "submit-email") { 
      // form says that required value is not valid; eject
      if (!data.emailAddress[0].validity.valid) 
        return;
    }

    // we are good; create indication of interest model and save
    var d = new Date();
    var ioi = new Labs.IndicationOfInterest({
      "emailAddress": data.emailAddress.val(),
      "city": data.city.val(),
      "note": data.note.val(),
      "type": data.type,
      "time": d.toUTCString()
    }).save();
    
    // show modal
    $("#contact-modal").modal('toggle');
  }

  function _handleUserContactInfoClickEvent(e) {
    // get data elements from submitting form
    emailAddress = $('#emailAddress', e.srcElement.form);
    city = $('#city', e.srcElement.form);
    note = $('#note', e.srcElement.form);

    // package data elements and pass to capture
    var data = {
      "type": e.currentTarget.id,
      "emailAddress": emailAddress,
      "city": city,
      "note": note
    };
    _captureUserContactInfo(data);
  }

  function _clearFields(e) {
    // clear form fields
    emailAddress[0].value = "";
    city[0].value = "";
    note[0].value = "";
  }

  function _handleExperimentNavigationClickEvent(e){
    var id = $(e.target).attr("id").split("-")[1];
    $("div.screenshots div.experiments:visible").fadeOut("slow", function(){
        $("#experiment-"+id).fadeIn();
    });
    $("ul.experimentsnav li").removeClass("selected");
    $(e.target).addClass("selected");
  }

  return Labs;
});
