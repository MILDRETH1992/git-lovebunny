var mongoose = require('mongoose');

const schema = mongoose.Schema({
	nombre: String,
	usuario: String,
	ip: String
});
const Persona = mongoose.model('Persona', schema);

module.exports = Persona;
