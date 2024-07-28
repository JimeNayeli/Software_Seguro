const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');   
class UsersService {

  constructor() {}

  async find() {
    const res = await models.User.findAll();
    return res;
  }

  async findOne(id) {
    const res = await models.User.findByPk(id);
    return res;
  }

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password_hash, 10); 

    const user = await models.User.findOne({ where: { email: data.email }});
    if(!user){
    	const res = await models.User.create({
                ...data,
                password_hash: hashedPassword,
      });
			return res;
    } else {
			throw new Error('El usuario ya existe'); // Lanza un error si el usuario ya existe
		}
  }

  async update(id, data) {
    const model = await this.findOne(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { deleted: true };
  }

}

module.exports = UsersService;
