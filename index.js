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

async function run () {
    try {
        const serviceCollection = client.db( 'TouristSpot' ).collection( 'services' )

        // get services
        app.get( '/services', async ( req, res ) => {
            const query = {}
            const cursor = serviceCollection.find( query );
            const services = await cursor.toArray();
            res.send( services );
        } );

    }
    finally {

    }
}

run().catch( error => console.log( error ) )


app.get( '/', ( req, res ) => {
    res.send( 'Tourist spot server is running' )
} )

app.listen( port, () => {
    console.log( `Tourist spot server is running on ${ port }` );
} )
