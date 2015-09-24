semver = require 'semver'

module.exports = (grunt) ->

  current_version = grunt.file.readJSON('package.json').version

  require('load-grunt-tasks')(grunt)

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'


    coffeelint:
      src: 'src/lib/*.coffee'
      test: 'src/test/*.coffee'


    # Notify when there is a forgotten debug message on build.
    files_check:
      default:
        options:
          pattern: /console\.log/
        src: './lib/*.js'


    jasmine:
      default:
        src: ['./temp/lib/*.js']
        options:
          keepRunner: false
          specs: './temp/test/*.spec.js'


    coffee:
      src:
        files:
          './temp/lib/<%= pkg.name %>.js' : './src/lib/*.coffee'
      test:
        expand: true
        cwd: './src/test'
        src: '*.spec.coffee'
        dest: './temp/test/'
        ext: '.spec.js'


    copy:
      default:
        expand: true
        cwd: 'temp/lib/'
        src: '*.js'
        dest: 'lib/'


    usebanner:
      js:
        options:
          banner:
            """
              /*
              <%= pkg.title %>, v<%= pkg.version %>
              by <%= pkg.author.name %>
              <%= pkg.homepage %>
              */

            """
        files:
          src: ['./temp/lib/*.js']


    watch:
      src:
        files: ['./src/lib/*.coffee']
        tasks: ['coffeelint:src', 'coffee:src', 'test']
      test:
        files: ['./src/test/*.coffee']
        tasks: ['coffeelint:test', 'coffee:test', 'test']


    bump:
      options:
        files: [
          'package.json'
          'bower.json'
        ]
        updateConfigs: ['pkg']
        commitFiles: ['-a']
        pushTo: 'origin'


    conventionalChangelog:
      options:
        changelogOpts:
          preset: 'angular'
          warn: grunt.verbose.writeln
      default:
        src: './CHANGELOG.md'


    clean: ['temp']


    shell:
      update:
        command: [
          'npm update'
          'bower update'
        ].join '&&'


    # dialog choices used in `release` task
    prompt:

      release:
        options:
          questions: [
            {
              config: 'do_update'
              type: 'confirm'
              message: 'Do you want to update NPM and Bower dependencies?'
              default: true
            }
            {
              config: 'version'
              type: 'list'
              message: 'Bump version from <%= pkg.version %> to:'
              default: 'patch'
              choices: [
                {
                  value: 'patch'
                  name: "Patch (#{semver.inc current_version, 'patch'})"
                }
                {
                  value: 'minor'
                  name: "Minor (#{semver.inc current_version, 'minor'})"
                }
                {
                  value: 'major'
                  name: "Major (#{semver.inc current_version, 'major'})"
                }
              ]
            }
          ]


  # Constructs the code, runs tests and if everyting is OK, creates a minified
  # version ready for production. This task is intended to be run manually.
  do_build_msg = 'Do not run directly. Use `grunt release` instead.'
  grunt.registerTask 'do_release', do_build_msg, ->

    tasks_list = [
      "bump-only:#{grunt.config 'version'}"
      'build'
      'files_check'
      'conventionalChangelog'
      'bump-commit'
    ]

    # if user chose to run update in prompt, add the task to the begining
    if grunt.config 'do_update'
      tasks_list.unshift 'shell:update'

    grunt.task.run tasks_list


  grunt.registerTask 'release', 'Build, bump version and push to GIT.', [
    'prompt:release'
    'do_release'
  ]


  grunt.registerTask 'build', 'Compile source code to `./lib`.', [
    'clean'
    'dev'
    'usebanner'
    'copy'
  ]


  grunt.registerTask 'dev', [
    'coffeelint'
    'coffee'
    'jasmine'
  ]


  grunt.registerTask 'test', [
    'jasmine'
  ]


  grunt.registerTask 'default', [
    'clean'
    'dev'
    'watch'
  ]
