import { User } from './models/User';

const user = new User({ name: 'NEW', age: 9999 });

user.events.on('change', () => {
  console.log('changed!');
});
user.events.trigger('change');
