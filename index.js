const express = require( 'express' )
const app = express();
const cors = require( 'cors' );
const port = process.env.PORT || 5000;
require( 'dotenv' ).config();


// middleware
app.use( cors() );
app.use( express.json() );

// mongodb client connect
const { MongoClient, ServerApiVersion } = require( 'mongodb' );
const uri = `mongodb+srv://${ process.env.DB_user }:${ process.env.DB_password }@cluster0.mdoqsyi.mongodb.net/?retryWrites=true&w=majority`;
console.log( uri );
const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } );
client.connect( err => {
    const collection = client.db( "test" ).collection( "devices" );
    // perform actions on the collection object
    client.close();
} );



app.get( '/', ( req, res ) => {
    res.send( 'Tourist spot server is running' )
} )

app.listen( port, () => {
    console.log( `Tourist spot server is running on ${ port }` );
} )
