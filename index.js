/**
 * broccoli-cssshrink
 * © 2015 Daniil Filippov <filippovdaniil@gmail.com>
 * MIT License <https://github.com/filippovdaniil/broccoli-cssshrink/blob/master/LICENSE>
 */

var fs = require( 'fs' );
var path = require( 'path' );
var mkdirp = require( 'mkdirp' );
var writer = require( 'broccoli-caching-writer' );
var helpers = require( 'broccoli-kitchen-sink-helpers' );
var cssshrink = require( 'cssshrink' );

module.exports = CSSShrink;
CSSShrink.prototype = Object.create( writer.prototype );
CSSShrink.prototype.constructor = CSSShrink;
CSSShrink.prototype.input = '**/*.css';
CSSShrink.prototype.debug = false;
CSSShrink.prototype.comment = '';

function CSSShrink( tree, options ){
    if( ! ( this instanceof CSSShrink ) )
        return new CSSShrink( tree, options );

    options = options || {};
    for( var key in CSSShrink )
        if( CSSShrink.hasOwnProperty( key ) )
            this[ key ] = CSSShrink[ key ];
    for( var key in options )
        if( options.hasOwnProperty( key ) )
            this[ key ] = options[ key ];

    this.tree = tree;
    this.input = Array.isArray( this.input ) ? this.input : [ this.input ];
    writer.apply( this, arguments );
}


CSSShrink.prototype.updateCache = function( src, dst ){
    helpers.multiGlob( this.input, { cwd: src[ 0 ] } ).forEach(function( file ){
        var before = fs.readFileSync( src[ 0 ] + '/' + file ).toString( 'utf8' ),
            after = cssshrink.shrink( before );
        if( this.debug ){
            var percentage = ( ( 1 - after.length / before.length ) * 100 ).toFixed( 1 );
            console.log( '\033[1;32mFile "' + file + '" is shrinked by ' + percentage + '%\033[0m' );
        }
        mkdirp.sync( path.join( dst, path.dirname( file ) ) );
        fs.writeFileSync( path.join( dst, file ), this.comment + after, 'utf8' );
    }, this );
};
