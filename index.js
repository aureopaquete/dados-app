const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://AureoPaquete:@santolasquad007@cluster0-zqfu8.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }));


client.connect(err => {
  db = client.db("mongodb").collection("dados");

  app.listen(3001, function(){
	    console.log("O servidor está a correr na porta 3001");
  });
  
});




app.set('view engine', 'ejs');

//Metodo GET
app.get('/', (req, res) => {
    res.render('template.ejs');
});	

app.get('/', (req, res) => {
    const cursor = db.find();
});

app.get('/show', (req, res) => {
    db.find().toArray((err, results) => {
        if (err) return console.log("Error: "+ err);
        res.render('show.ejs', { dados: results });
    });
});



var ObjectId = require('mongodb').ObjectID;
//EDIT
app.route('/edit/:id')
.get((req,res) => {
    var id = req.params.id;
db.find(ObjectId(id)).toArray((err, result) => {
        if (err) return console.log("Error: " + err);
     res.render('edit.ejs', { dados: result });
    });
})
.post((req,res) => {
    var id = req.params.id;
    var nome = req.body.nome;
    var idade = req.body.idade;
    var altura = req.body.altura;
db.updateOne({_id: ObjectId(id)}, {
        $set: {
     nome: nome,
     idade: idade,
     altura: altura    
 }
    }, (err, result) => {
     if (err) return res.send(err);
        res.redirect('/show');
 console.log("Registo atualizado com sucesso!");
    })
});


//DELETE
app.route('/delete/:id')
.get((req,res) => {
    var id = req.params.id;
db.deleteOne({_id: ObjectId(id)}, (err, result) => {
     if (err) return res.send(500, err);
 console.log("Registo eliminado com sucesso!");
 res.redirect('/show');
    });
});


//Metodo POST
app.post('/show', (req, res) => {
    db.insertOne(req.body, (err, result) => {
        if (err) return console.log("Erro: " + err);
 
        console.log("Registo guardado com sucesso na BD!");
        res.redirect('/show');
	
    });

app.listen(process.env.PORT || 3000);


});

