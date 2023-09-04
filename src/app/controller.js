var mongoose = require('mongoose');
var Persona = require('./modelo/persona');
// console.log('Persona: ', Persona);

// mongoose.createConnection("mongodb://127.0.0.1:27017/chat")
// 	.then(()=> {
// 		console.log("connection successful");

		// console.log('mongoose: ', mongoose);
		// const schema = mongoose.Schema({
		// 	nombre: String,
		// 	usuario: String,
		// 	ip: String
		// });
		// const Persona = mongoose.model('Persona', schema);
		// console.log('Persona: ', Persona);



		// Persona.find({}).then((data) => {
		// 	console.log('data: ', data);
		// 	// res.json(data);
		// });
	// }).catch((err) => console.log(err));


// Obtiene todos los objetos Persona de la base de datos
exports.getPersona = function (req, res){
    /*
	Persona.find(
		function(err, persona) {
			if (err)
				res.send(err)
					res.json(persona); // devuelve todas las Personas en JSON
				}
			);
    */

    // Persona.find({}).then((data) => {
    //     console.log(data);
    //     res.json(data); // devuelve todas las Personas en JSON
    // });

	Persona.find().then((data) => {
		console.log('data: ', data);
		res.json(data);
	});
}

// Guarda un objeto Persona en base de datos
exports.setPersona = function(req, res) {

		// Creo el objeto Persona
		/*
		Persona.create(
			{nombre : req.body.nombre,usuario: req.body.usuario, ip: req.body.ip},
			function(err, persona) {
				if (err)
					res.send(err);
				// Obtine y devuelve todas las personas tras crear una de ellas
				Persona.find(function(err, persona) {
				 	if (err)
				 		res.send(err)
				 	res.json(persona);
				});
			});
		*/

		Persona
			.create({
						nombre : req.body.nombre,
						usuario: req.body.usuario,
						ip: req.body.ip
					})
				.then((data) => {
					console.log(data);
					Persona.find().then((data) => {
						console.log(data);
						res.json(data); // devuelve todas las Personas en JSON
					});
				});

}

// Modificamos un objeto Persona de la base de datos
exports.updatePersona = function(req, res){
	Persona.update( {_id : req.params.persona_id},
					{$set:{nombre : req.body.nombre,usuario: req.body.usuario, ip: req.body.ip}},
					function(err, persona) {
						if (err)
							res.send(err);
				// Obtine y devuelve todas las personas tras crear una de ellas
				Persona.find(function(err, persona) {
				 	if (err)
				 		res.send(err)
				 	res.json(persona);
				});
			});
	}

// Elimino un objeto Persona de la base de Datos
exports.removePersona = function(req, res) {
	Persona.remove({_id : req.params.persona_id}, function(err, persona) {
		if (err)
			res.send(err);
			// Obtine y devuelve todas las personas tras borrar una de ellas
			Persona.find(function(err, persona) {
				if (err)
					res.send(err)
				res.json(persona);
			});
		});
}
