define(
  [
    'plugin.validation'
  ],

  function() {
    console.log( 'validation plugin loaded' );

    // Cache the error messages container
    var $errorContainer = $( '.errorContainer' );

    // Set the default validation options
    var validationOptions = {
      errorContainer: '.errorContainer',
      errorLabelContainer: '.errorContainer',
      errorElement: 'li',
      invalidHandler: function( e, validator ) {
        var errors = validator.numberOfInvalids();
        if ( errors ) {
          $errorContainer.show();
        } else {
          $errorContainer.hide();
        }
      }
    };


    /**
     * Custom validator to check if an object isn't
     * equal to the specified value
     */
    $.validator.addMethod( 'notEqual', function( value, element, param ) {
      return this.optional( element ) || value !== param;    
    }, 'Please specify a different (non-default) value' );


    /**
     * Custom validator to check the number of word
     */
    $.validator.addMethod( 'wordCount',
       function(value, element, params) {
          var typedWords = jQuery.trim(value).split(' ').length;
     
          if(typedWords <= params[0]) {
             return true;
          }
       },
       $.format( 'Only {0} words allowed.' )
    );
    
    /**
     * Check if the validation plugin is loaded and validate the current page
     * @param  jQuery obj   form    The form we want to validate
     * @param  {[type]}     options Additionnal options for the validation plugin
     * @return object       The validator object returned by the plugin
     */
    function _validate( form, options ) {
        var $form = form || $( 'form:visible' ).eq( 0 );

        // Merge the parameter options with the default ones
        $.extend( true, validationOptions, options );

        // Make sur the validation plugin is loaded
        if ( $().validate ) {
          return $form.validate( validationOptions );
        } else {
          return false;
        }
    }

    console.log( 'validation module initialized' );

    return {
      validate: _validate
    };
  }
);