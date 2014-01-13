define(
  function() {

    // Define constants and project variables
    var FB_APPID  = '';
    var API_KEY   = '';

    var mp = MYPROJECT = {
      maxusers : 20,
      maxFileSize : 512
    };
    

    function _initEnv() {
      console.log( 'environment loaded for this project' );
    }


    return {
      initEnv: _initEnv
    };
  }
);