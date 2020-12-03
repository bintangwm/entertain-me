const { MongoClient } = require('mongodb');
 
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });
 
client.connect()

const db = client.db('entertain-me')

module.exports = db