module.exports = function ( grunt )
{
	grunt.initConfig( {
		pkg : grunt.file.readJSON( 'package.json' ),

		// compile your sass
		sass : {
			dev : {
				options : {
					style : 'expanded'
				},
				src : ['app/styles/main.scss'],
				dest : 'app/styles/main.css'
			},
			prod : {
				options : {
					style : 'compressed'
				},
				src : ['app/styles/main.scss'],
				dest : 'dist/styles/main.css'
			}
		},

		// watch for changes
		watch : {
			scss : {
				files : ['app/styles/**/*.scss'],
				tasks : [
					'sass:dev',
					'notify:scss'
				],
				options : {
					livereload : true
				}
			}
		},
		// notify cross-OS
		notify : {
			scss : {
				options : {
					title : 'Grunt, grunt!',
					message : 'SCSS is all gravy'
				}
			},
			js : {
				options : {
					title : 'Grunt, grunt!',
					message : 'JS is all good'
				}
			}
		},

		requirejs : {
			compile : {
				options : {
					name : '../bootstrap',
					mainConfigFile : 'app/bootstrap.js',
					out : 'dist/<%= pkg.name %>.js',
					include : ['../bower_components/almond/almond.js']
				}
			}
		},

		copy : {
			main : {
				files : [
					// includes files within path
					{
						expand : true,
						src : [ '**', '!bower_components/**', '!js/**', '!*.js', '!*.scss'],
						cwd : 'app/',
						dest : 'dist/',
						filter : 'isFile'}
				]
			}
		}

	} );

	// Load NPM's via matchdep
	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	grunt.registerTask( 'build', ['copy', 'sass:prod'] );
};