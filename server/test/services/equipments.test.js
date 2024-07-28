// tests/services/users.service.test.js
const EquipmentService = require('../../src/services/equipments.service');
const { models } = require('../../src/libs/sequelize');

jest.mock('../../src/libs/sequelize', () => ({
  models: {
    Equipment: {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('EquipmentService', () => {
  let userService;

  beforeEach(() => {
    userService = new EquipmentService();
  });

  it('should find all equipments', async () => {
    models.Equipment.findAll.mockResolvedValueOnce([{ id: 1, name: 'Telescopio' }]);
    const result = await userService.find();
    expect(result).toEqual([{ id: 1, name: 'Telescopio' }]);
  });

  it('should find one equipment by id', async () => {
    models.Equipment.findByPk.mockResolvedValueOnce({ id: 1, name: 'Telescopio' });
    const result = await userService.findOne(1);
    expect(result).toEqual({ id: 1, name: 'Telescopio' });
  });

  it('should create a new Equipment', async () => {
    models.Equipment.create.mockResolvedValueOnce({ id: 1, name: 'Telescopio' });
    const result = await userService.create({ name: 'Telescopio' });
    expect(result).toEqual({ id: 1, name: 'Telescopio' });
  });

  it('should update an existing equipment', async () => {
    models.Equipment.findByPk.mockResolvedValueOnce({ id: 1, name: 'Telescopio' });
    models.Equipment.update.mockResolvedValueOnce([1]);
    const result = await userService.update(1, { name: 'Telescopios' });
    expect(result).toEqual({ id: 1, name: 'Telescopios' });
  });

  it('should delete an existing user', async () => {
    models.Equipment.findByPk.mockResolvedValueOnce({ id: 1, name: 'Telescopio' });
    models.Equipment.destroy.mockResolvedValueOnce(1);
    const result = await userService.delete(1);
    expect(result).toEqual({ deleted: true });
  });
});