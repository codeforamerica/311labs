define([
  "app",

  // Libs
  "backbone",

  // Views
  "modules/todo/views",

  // Plugins
  "plugins/backbone-localstorage"
],

function(app, Backbone, Views) {

  // Create a new module
  var Todo = app.module();

  // Todo Model
  // ----------

  // Our basic **Todo** model has `content` and `done` attributes.
  Todo.Model = Backbone.Model.extend({
    // Default attributes for the todo.
    defaults: {
      done: false
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({
        done: !this.get("done")
      });
    },

    // Remove this Todo from *localStorage* and delete its view.
    clear: function() {
      this.destroy();
    },

    // Ensure some content has been filled in
    validate: function(attrs) {
      if (!attrs.content) {
        return "Missing content for todo item.";
      }
    }
  });

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  Todo.List = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: Todo.Model,

    // Save all of the todo items under the `"todos"` namespace.
    localStorage: new Store("todos-backbone"),

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(todo) {
        return todo.get("done");
      });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) {
        return 1;
      }

      return this.last().get("order") + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
      return todo.get("order");
    }
  });

  // Todo Views
  // ----------

  // Attach the Views sub-module into this module.
  Todo.Views = Views;

  // Required, return the module for AMD compliance
  return Todo;

});
