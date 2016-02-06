module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			dist: {
				options: {},
				src: 'dist/**'
			}
		},
		copy: {
			assets: {
				expand: true,
				cwd: 'src/assets/',
				src: ['**'],
				dest: 'dist/assets/'
			},
			templates: {
				expand: true,
				cwd: 'src/templates/',
				src: ['**'],
				dest: 'dist/templates/'
			},
			index: {
				expand: true,
				cwd: 'src/',
				src: ['index.html'],
				dest: 'dist/'				
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
	grunt.registerTask('dev', ['clean', 'copy', 'concat', 'wrap:iife']);
	grunt.registerTask('default', ['clean', 'copy', 'concat', 'wrap:iife', 'uglify:basic']);
}

