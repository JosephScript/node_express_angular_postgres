var grunt = require('grunt');
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.initConfig({
  copy: {
    main: {
      files: [
        {
          expand: true,
          cwd: 'node_modules/angular/',
          src: ['angular.min.js'],
          dest: 'public/vendor/'
        }, {
          expand: true,
          cwd: 'node_modules/checklist-model/',
          src: ['checklist-model.js'],
          dest: 'public/vendor/'
        }, {
          expand: true,
          cwd: 'node_modules/skeleton-css/css',
          src: ['normalize.css', 'skeleton.css'],
          dest: 'public/vendor/'
        }
      ],
    },
  }
});

grunt.registerTask('default', ['copy']);
module.exports = grunt;
