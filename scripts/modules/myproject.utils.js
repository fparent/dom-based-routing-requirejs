define(
  [
    'jquery'
  ],

  function( $ ) {
    /**
     * Reprensent the current language based on the html attribute
     * @type string
     */
    var _lang = $( 'html' ).attr( 'lang' );


    /**
     * Check if the browser support HTML5 Details/Summary tags.
     * If not, loads the polyfill and add support via jQuery fallback.
     * @return none
     */
    function _details() {
      if ( $( 'html' ).hasClass( 'no-details' ) ) {
        $( 'details' ).details();
      }
    }


    /**
     * Move the page to a specific offset with easing
     * @param  int      top   The position at which the page should scroll to
     * @return none
     */
    function _scrollTo( top ) {
      $( 'html, body' ).animate({ scrollTop: top }, 'slow', 'easeInOutSine' );
    }


    /**
     * Simple tabs module used to toggle between different panels
     * @return null
     */
    function _tabs() {
      var $nav = $( '[data-js="tabs"]' ).find( '.tab-nav-item' );

      $nav.on( 'click', function( e ) {
        // Get the clicked tab's matching panel name
        var panelName = $( this ).data( 'tab' );
        var $navItems = $( this ).closest( '.tabs-nav' ).find( '.tab-nav-item' );
        var $panels = $( this ).closest( '.tabs-nav' ).siblings( '.tab-panel' );

        e.preventDefault();

        // If the clicked tab is already active, do nothing
        if ( $( this ).hasClass( 'is-active' ) ) {
          return false;
        }

        // Toggle the classnames to highlight the selected tab
        $navItems.toggleClass( 'is-active' );

        // Hide all of the panels visible and show the matching one
        $panels
          .hide()
          .filter( '[data-name="' + panelName + '"]' )
          .show();

      });
    }



    /**
     * Clone a DOM object and increment all the child objects' ids
     * and names property (useful in forms).
     * @param  DOMobj $el The original element that will be cloned
     * @return DOMobj     The cloned container
     */
    function _clone( $el, autoIncrement ) {

      var $clone = $el.clone( true );

      // Get the number at the end of the ID, increment it, and replace the old id
      if( autoIncrement ){
        $clone.attr( 'id', $clone.attr( 'id' ).replace( /\d+$/, function( str ) { return parseInt( str, 10 ) + 1; }) );

        // Find all elements in $clone that have an ID or name, and iterate using each()
        $clone.find( '[id], [name]' ).each( function() {

          //Perform the same replace as above
          var $th = $( this );

          if ( $th.attr( 'id' ) !== undefined ) {
            $th.attr( 'id', $th.attr( 'id' ).replace( /\d+$/, function( str ) { return parseInt( str, 10 ) + 1; }) );
          }

          if ( $th.attr( 'name' ) !== undefined ) {
            $th.attr( 'name', $th.attr( 'name' ).replace( /\d+$/, function( str ) { return parseInt( str, 10 ) + 1; }) );
          }
        });
      }

      //Reset the inputs
      $( 'input', $clone ).val( '' );

      return $clone;
    }


    function _cloneAndInsert( $el, $target, autoIncrement ) {
      $target.after( _clone( $el, autoIncrement ) );
    }


    /**
     * Bind the click event on a target. When triggered, toggle the
     * list container
     * @return {[type]} [description]
     */
    function _dropdownList() {
      var $toggle = $( '[data-js="toggle-list"]' );
      var $list = $toggle.next( '.dd-list' );
      var $listItems = $list.find( '.dd-list-link' );
      var $input = $list.siblings( 'input[type="hidden"]' );

      $toggle.on( 'click', function( e ) {
        e.preventDefault();

        $( this ).toggleClass( 'is-opened' );
        $list.toggle();

        return false;
      });

      $listItems.on( 'click', function( e ) {
        var $this = $( this );

        e.preventDefault();

        // If there's a hidden field next to the dropdown list,
        // assign it the selected value when clicking on a list item
        if ( $input.length ) {
          $input.val( $this.data( 'id' ) );
        }

        // Update the toggle link text and close the list
        $toggle.text( $this.text() ).addClass( 'is-selected' ).toggleClass( 'is-opened' );
        $list.toggle();
      });
    }


    /**
     * Takes and RFC822 RSS Date string and standardizes it's
     * formatting to be "%m dd, yyyy"
     *
     * @param   string  rssDateString   RFC822 compliant date string
     * @return  string                  Formatted date (see above)
     */
    function _formatRSSDate( rssDateString ) {
      var parts = ( new Date( rssDateString ) ).toDateString().split( ' ' );

      return [ parts[ 1 ], parts[ 2 ] + ',', parts[ 3 ] ].join( ' ' );
    }


    /**
     * Send a request to load the RSS feed via Ajax and return
     * the receive object
     * @param  string   url       Blog's RSS url
     * @return html               Resulting data
     */
    function _getBlogArticles( url ) {
      return $.ajax({
        url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=' + encodeURIComponent( url ),
        dataType: 'jsonp'
      });
    }


    // When an image has a figcaption child element,
    // animate that caption on mouseover and hide hide on mouseleave
    function showCaption( $els ) {
      $els.on( 'mouseenter mouseleave', function( e ) {
        var $caption = $( this ).find( '.caption' );

        if ( $caption.html() === '' ) { return false; }

        if ( e.type === 'mouseenter' ) {
          $caption.animate({ 'bottom': 0 }, 200 );
        } else {
          $caption.animate({ 'bottom': '-100px' }, 200 );
        }
      });
    }

    /**
     * Takes a url and splits the query string into a javascript plain
     * object. If the same parameter is there multiple time, it will
     * only grab the last value. If "url" isn't set, it will default to
     * the current url.
     *
     * @param  string  url a valid URL string
     * @return object  a javascript plain object containing key/values of
     *                 the query string params.
     */
    function _queryStringToObject( url ){
      var _url = url || window.location.search.toString();
      var qsObj = {};

      _url.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function( $0, $1, $2, $3 ) { qsObj[ $1 ] = $3; }
      );

      for ( var prop in qsObj ) {
        if ( qsObj.hasOwnProperty( prop ) ) {
          if ( qsObj[ prop ] === '' ) {
            delete qsObj[ prop ];
          }
        }
      }

      return qsObj;
    }

    return {
      lang        : _lang,
      details     : _details,
      scrollTo    : _scrollTo,
      tabs        : _tabs,
      clone       : _clone,
      cloneInsert : _cloneAndInsert,
      dropdown    : _dropdownList,
      fetchBlog   : _getBlogArticles,
      formatDate  : _formatRSSDate,
      caption     : showCaption,
      qsToObject  : _queryStringToObject
    };
  }
);