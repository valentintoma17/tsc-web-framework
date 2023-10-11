import { User } from './User';

const data = new User({ name: 'Name', age: 14 });

data.on('change', () => {
  console.log('I have spoken');
});

data.trigger('change');
