import { Collection } from './models/Collection';
import { IUserProps, User } from './models/User';

const rootUrl = 'http://localhost:3000/users';

const collection = new Collection<User, IUserProps>(
  rootUrl,
  (json: IUserProps) => User.buildUser(json)
);

collection.on('change', () => {
  console.log(collection);
});

collection.fetch();
