/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, maxerr:50, immed:true, newcap:true, trailing:true, eqnull:true */

//************************************************************************************
// SETTINGS
//************************************************************************************
require.config({
    baseUrl: 'scripts/modules',

    //optimize: "none",

    paths : {
      // Libs
      'jquery'        : '../libs/jquery/jquery-2.0.3.min',

      // Module for your project
      'mp.env'        : 'myproject.env',
      'mp.utils'      : 'myproject.utils',
      'mp.validation' : 'myproject.validation',
      'mp.images'     : 'myproject.images',

      // Plugins
      'plugin.colorbox'     : '../plugins/jquery.colorbox',
      'plugin.validation'   : '../plugins/jquery.validate.min',
      'plugin.jcrop'        : '../plugins/jquery.jcrop.min',

      // Polyfills
      'polyfill.number'   : '../plugins/number-polyfill.min'
    },

    shim: {
      'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'underscore': {
        exports: '_'
      }
    }
});


//************************************************************************************
// INITIALIZE
//************************************************************************************

requirejs(
  [
    'require',
    'jquery',
    'mp.env'
  ],

  function( require, $, env ) {
    'use strict';

    function init() {
      // If metadata on HTML grab it and do a require
      // body have a 'data-modules="foo, bar/ipsum, dolor"'
      var modules = $( 'body' ).data( 'modules' ) || '';

      // initialize the environment stuff for your project
      env.initEnv();

      if ( modules ) {
        require( modules.split( /\s*,\s*/ ), function() {
          // Do something when the page's modules have finish loading
        });
      }
    }

    //init app on domready
    $( function() {
      init();
    });
  }
);
