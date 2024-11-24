require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

console.log("Testando transferencia da string de conexao");
console.log(uri);


(async() =>{
    try {
        await client.connect();
        const dbRole = await client.db().command({hello: 1});
        console.log(
            `Role of database - Host: ${dbRole.me} Is primary: ${dbRole.isWritablePrimary}`
        );

        //Acesssando


    //Criar coleção
    await client.connect();
    const  moviesCollection = await client
        .db().collection('movies');

    console.log('Collection name: ', moviesCollection.collectionName);

    // adicionar document
    const result = await moviesCollection.insertOne({name: 'Spier-Man: No Way Home', year: 2021});

    const { insertedId } = result;
    console.log('Result' , insertedId);

    //buscafr documento baseado no Id
    const document = await moviesCollection.findOne({_id: insertedId});
    console.log('Document from db', document);

    //Obter numero de documentos
    console.log('Number of Documents', 
        await moviesCollection.estimatedDocumentCount()
    );


        await client.close();
    } catch (e) {
        console.log('Error:  ' , e.message);
    }
}) ();



