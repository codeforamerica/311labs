exports.description = "BBB: Add new module";
exports.notes = "Generates a new module";

exports.template = function(grunt, init, done) {

  var _ = grunt.utils._;

  _.extend(grunt.helper("prompt_for_obj"), {
    name: {
      message: "Module Name",
      validator: /^[\w\-\.]+$/
    }
  });

  grunt.helper("prompt", {}, [

    // Get the name of the module.
    grunt.helper("prompt_for", "name")

  ], function(err, props) {
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Ensure the name is lowercase.
    props.name = props.name.toLowerCase();

    // Set the module name to be the title case.
    props.module_name = props.name[0].toUpperCase() + props.name.slice(1);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {});

    // All done!
    done();
  });

};
