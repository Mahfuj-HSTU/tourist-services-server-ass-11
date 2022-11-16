const express = require( 'express' )
const app = express();
const cors = require( 'cors' );
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require( 'mongodb' );
require( 'dotenv' ).config();


// middleware
app.use( cors() );
app.use( express.json() );

// mongodb client connect
const uri = `mongodb+srv://${ process.env.DB_user }:${ process.env.DB_password }@cluster0.mdoqsyi.mongodb.net/?retryWrites=true&w=majority`;
// console.log( uri );
const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } );

async function run () {
    try {
        const serviceCollection = client.db( 'TouristSpot' ).collection( 'services' )
        const reviewCollection = client.db( 'TouristSpot' ).collection( 'review' )

        // get services
        app.get( '/services', async ( req, res ) => {
            const query = {}
            const cursor = serviceCollection.find( query );
            const services = await cursor.toArray();
            res.send( services );
        } );

        // get service detail
        app.get( '/services/:id', async ( req, res ) => {
            const id = req.params.id;
            const query = { _id: ObjectId( id ) };
            const service = await serviceCollection.findOne( query )
            res.send( service )
        } )

        // post services
        app.post( '/services', async ( req, res ) => {
            const service = req.body;
            const result = await serviceCollection.insertOne( service );
            res.json( result );
        } );

        // Review api
        // get review

        // post review
        app.post( '/review', async ( req, res ) => {
            const review = req.body;
            const result = await reviewCollection.insertOne( review );
            res.json( result );
            // console.log( review )
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
