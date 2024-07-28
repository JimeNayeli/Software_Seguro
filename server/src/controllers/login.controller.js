const LoginService = require('../services/login.service');
const service = new LoginService();

const signIn = async (req, res) => {
  try {
    const response = await service.generateAccessToken(req.body);
		res.json({ success: true, data: response });
  } catch (error) {
		res.status(500).send({ success: false, message: error.message});
  }
}

module.exports = { signIn };