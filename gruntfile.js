module.exports = function (grunt) {

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-replace');
  process.env.NODE_ENV = 'test';
  grunt.initConfig({
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'ts-node/register',
          delay: true,
          execOptions: {
            env: {
              'NODE_ENV': 'test'
            }
          },
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          clearCacheFilter: (key) => true, // Optionally defines which files should keep in cache
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['tests/**/*.ts']
      }
    },
    uglify: {
      my_target: {
        files: [
          {'analitycscode/code/analytics.min.js': 'analitycscode/code/analytics.js'},
          {'analitycscode/customerCode/init.min.js': 'analitycscode/customerCode/init.js'}
        ]
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /http\:\/\/localhost\:3000/g,
              replacement: "https://gti525-analitycs.herokuapp.com"
            }
          ]
        },
        files: [
          {'analitycscode/code/analytics.prod.js': 'analitycscode/code/analytics.min.js'},
          {'analitycscode/customerCode/init.prod.js': 'analitycscode/customerCode/init.min.js'}
        ]
      }
    },
    shell: {
      npm_start: {
        command: 'ts-node ./lib/app.ts'
      }
    }
  });

  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('mini', ['uglify','replace']); 
};
