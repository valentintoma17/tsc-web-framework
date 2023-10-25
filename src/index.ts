import { User } from './models/User';

const user = new User({ id: 1, name: 'new name', age: 17 });

user.on('save', () => {
  console.log(user);
});

user.save();
