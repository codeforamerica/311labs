exports.description = "Backbone Boilerplate Tutorial";
exports.notes = "Generates the tutorial files.";

exports.template = function(grunt, init, done) {

  // Files to copy (and process).
  var files = init.filesToCopy({});

  // Actually copy (and process). files.
  init.copyAndProcess(files, {}, {
    noProcess: [ "assets/**", "test/**", "favicon.ico" ]
  });

  // All done!
  done();

};
