module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			dist: {
				options: {},
				src: 'dist/**'
			},
			build: {
				options: {},
				src: 'build/**'
			}
		},
		copy: {
			assets: {
				expand: true,
				cwd: 'src/assets/',
				src: ['**'],
				dest: 'dist/assets/'
			},
			index: {
				expand: true,
				cwd: 'src/',
				src: ['index.html'],
				dest: 'dist/'				
			}
		},
		ngtemplates: {
			templates: {
				cwd: 'src',
				src: 'templates/**.html',
				dest: 'build/templates.js'
			}
		},
		concat: {
			application: {
				src: [
					'src/js/modules.js',
					'src/js/services/storageService.js',
					'src/js/services/idService.js',
					'src/js/services/lists.js',
					'src/js/services/users.js',
					'src/js/services/items.js',
					'src/js/services/comments.js',
					'src/js/controllers/userSelectCtrl.js',
					'src/js/controllers/userCtrl.js',
					'src/js/controllers/listCtrl.js',
					'src/js/controllers/itemCtrl.js',
					'src/js/controllers/appCtrl.js',
					'src/js/filters.js',
					'build/templates.js',
					'src/js/app.js'
					],
				dest: 'dist/js/application.js'
			},
			vendor: {
				src: [
					'src/lib/angular-1.4.9.js',
					'src/lib/angular-ui-router-0.2.17.js',
					'src/lib/ui-bootstrap-tpls-1.1.2.js',
					'src/lib/angular-mailto.js'
					],
				dest: 'dist/js/vendor.js'
			}
		},
		wrap: {
			iife: {
				src: ['dist/js/application.js'],
				dest: 'dist/js/application.js',
				options: {
					wrapper: ['(function(){', '})();']
				}
			}
		},
		uglify: {
			basic: {
				options: {
					sourceMap: true
				},
				files: {
					'dist/js/application.js': ['dist/js/application.js'],
					'dist/js/vendor.js': ['dist/js/vendor.js']
				}
			}
		}
	});
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.registerTask('dev', ['clean', 'copy', 'ngtemplates', 'concat', 'wrap:iife']);
	grunt.registerTask('default', ['clean', 'copy', 'ngtemplates', 'concat', 'wrap:iife', 'uglify:basic']);
}

