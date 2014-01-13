define(
  [
    'plugin.jcrop'
  ],

  function() {

    console.log( 'load the dependencies for the images module' );

    var _jcropapi = null;

    /**
     * Computes a centered cropping and resizing operation. Tries to
     * perform the smallest resizing possible to reach the target width
     * and height. Useful for smart automatic image cropping.
     * @param  integer  width  The current width of the region to compute
     * @param  integer  height The current height of the region to compute
     * @param  integer  targetHeight The target height to compute.
     * @param  integer  targetWidth The target width to compute.
     * @return object   contains x and y , the offsets and h and w, the
     *                  final region sizes.
     */
    function _frameOp( width, height, tarWidth, tarHeight ) {
      if( tarWidth === 0 && tarHeight === 0 ){
        return;
      }

      if ( ( width / tarWidth  ) < ( height / tarHeight ) ) {

        //Determine the required resize width/height
        var finalHeight = tarWidth/width * height;

        //Determine the crop
        return {
          h : finalHeight,
          w : tarWidth,
          x : 0,
          y : ( ( finalHeight - tarHeight ) / 2 )
        };
      }
      else {
        //Determine the required width/height
        var finalWidth = tarHeight/height * width;

        //Determine the crop
        return {
          h : tarHeight,
          w : finalWidth,
          x : ( ( finalWidth - tarWidth ) / 2 ),
          y : 0
        };
      }
    }


    /**
     * Initialize the Jcrop plugin and add the listener
     * on an element. If the reset paramater is true,
     * it means that there is a reset button that cancel
     * the destroy the cropped area and reset it to initial
     * values
     * @param  DOM obj  $el         The crop button
     * @param  DOM obj  $img        The image to be cropped
     * @param  object   targetSize  The optimal size (width & height)
     * @param  bool     reset       If a reset button exists
     * @return none
     */
    function _crop( $el, $img, tSize, oSize, reset ) {
    
    }


    console.log( 'images module loaded and ready to use' );

    return {
      crop : _crop
    };
  }
);