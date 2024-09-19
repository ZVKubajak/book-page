import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'Jane Doe', password: 'test'},
  ], { individualHooks: true });
};
