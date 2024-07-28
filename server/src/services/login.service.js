const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
class LoginService {

	constructor() {}
	// Funcion donde utilizo la data de usuario 
	// para verificar si esta existe en la bd
	// y si el hasch de la contraseña ingresada coincide con el hash de la bd
	// finalmente la funcion genera y devuelve un token de verificar la contraseña
	// Si la aplicacion necesita de tokens personalizados no se como funcionan
	// pero puede que convenga generar el token en el controlador y no aqui en el servicio 
	async generateAccessToken (data) {
		// Busco el usuario por 
		const user = await models.User.findOne({ where: { email: data.email }});
		if(!user)
			throw new Error('Usuario no encontrado');

		const passwordMatch = await bcrypt.compare(data.password_hash, user.password_hash);
		if(!passwordMatch)
			throw new Error('Password incorrecto');

		// Generacion de la clave privada temporal para generar el token, este es un numero aleatorio
		const secretKey = crypto.randomBytes(32).toString('hex');

		// Generando y devolviendo el token de acceso
		const accessToken = jwt.sign({userId: user.id}, secretKey, { expiresIn: '1h' });
		return accessToken;
	}
}

module.exports = LoginService;