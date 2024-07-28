// tests/services/users.service.test.js
const UsersService = require('../../src/services/users.service');
const { models } = require('../../src/libs/sequelize');

jest.mock('../../src/libs/sequelize', () => ({
  models: {
    User: {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('UsersService', () => {
  let userService;

  beforeEach(() => {
    userService = new UsersService();
  });

  it('should find all users', async () => {
    models.User.findAll.mockResolvedValueOnce([{ id: 1, name: 'John' }]);
    const result = await userService.find();
    expect(result).toEqual([{ id: 1, name: 'John' }]);
  });

  it('should find one user by id', async () => {
    models.User.findByPk.mockResolvedValueOnce({ id: 1, name: 'John' });
    const result = await userService.findOne(1);
    expect(result).toEqual({ id: 1, name: 'John' });
  });

  it('should create a new user', async () => {
    models.User.create.mockResolvedValueOnce({ id: 1, name: 'John' });
    const result = await userService.create({ name: 'John' });
    expect(result).toEqual({ id: 1, name: 'John' });
  });

  it('should update an existing user', async () => {
    models.User.findByPk.mockResolvedValueOnce({ id: 1, name: 'John' });
    models.User.update.mockResolvedValueOnce([1]);
    const result = await userService.update(1, { name: 'Jane' });
    expect(result).toEqual({ id: 1, name: 'Jane' });
  });

  it('should delete an existing user', async () => {
    models.User.findByPk.mockResolvedValueOnce({ id: 1, name: 'John' });
    models.User.destroy.mockResolvedValueOnce(1);
    const result = await userService.delete(1);
    expect(result).toEqual({ deleted: true });
  });
});
