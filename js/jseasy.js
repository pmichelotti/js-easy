
( function( global ) {

	/**
	 * Selector functionality
	 * 
	 * select and selectAll extend String treating the string they are called on as a selector and attempting 
	 * to query the document for elements matching the selector.
	 *
	 * Document querying is done using the native methods querySelector and querySelectorAll
	 */

	var _makeElementSelection = function( selectorString, getAll, scope ) {

		var trueScope = scope || document;

		if ( typeof scope === 'string' ) {
			trueScope = _makeElementSelection( scope );
		}

		if ( getAll ) {
			return trueScope.querySelectorAll( selectorString );
		}

		return trueScope.querySelector( selectorString );

	};

	Object.defineProperties( String.prototype, {

		"select" : {
			"value" : function() {

				var selectorString = this;
				return _makeElementSelection( selectorString, false );

				},
			"writable" : true
		}, 
		"selectAll" : {
			"value" : function() {

				var selectorString = this;
				return _makeElementSelection( selectorString, true );

			}, 
			"writable" : true
		}, 
		"selectFrom" : {
			"value" : function( scope ) {

				var selectorString = this;
				return _makeElementSelection( selectorString, false, scope );

			}, 
			"writable" : true
		}, 
		"selectAllFrom" : {
			"value" : function( scope ) {

				var selectorString = this;
				return _makeElementSelection( selectorString, true, scope );

			}, 
			"writable" : true
		}
	} );



	/*
	 * End of selector functionality
	 */

	/*
	 * HTTP Mechanisms
     */

     var XHRPromiseFactory = function( path, properties ) {

     	var method = properties.method || 'GET';
     	var async = true;

     	var retPromise = new Promise( function( resolve, reject ) {
     		var request = new XMLHttpRequest();
     		request.open( method, path, async );

     		request.onload = function() {
     			if ( request.status == 200 ) {
     				resolve( request.response );
     			}
     			else {
     				reject( Error( request.statusText ) );
     			}
     		};

     		request.onerror = function() {
     			reject( Error( "Error" ) );
     		};

     		request.send();
     	} );

     	return retPromise;

     };

    /*
     * String Variant
     */
    Object.defineProperties( String.prototype, {

    	"GET" : {
    		"get" : function() {
    			var requestPath = this;
    			return XHRPromiseFactory( requestPath, { method : "GET" } );
    		 }
    	}

    } );

    /*
     * Global Function Variant
     */
    global.GET = function( urlString ) {

    	return XHRPromiseFactory( urlString, { method : "GET" } );

    };


    /*
     * End of HTTP Mechanisms
     */

} )( this );