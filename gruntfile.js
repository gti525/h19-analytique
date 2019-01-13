module.exports = function(grunt) {
 
    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
      // Configure a mochaTest task
      mochaTest: {
        test: {
          options: {
            reporter: 'spec',
            require: 'ts-node/register',
            delay: true,
            quiet: false, // Optionally suppress output to standard out (defaults to false)
            clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
            clearCacheFilter: (key) => true, // Optionally defines which files should keep in cache
            noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
          },
          src: ['tests/**/*.ts']
        }
      }      
    });
   
    grunt.registerTask('test', 'mochaTest');
  };