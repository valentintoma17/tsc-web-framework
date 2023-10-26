import { Model } from './Model';
import { Attributes } from './Attributes';
import { Sync } from './APISync';
import { Eventing } from './Eventing';

export interface IUserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<IUserProps> {
  static buildUser(attr: IUserProps): User {
    return new User(
      new Attributes<IUserProps>(attr),
      new Eventing(),
      new Sync(rootUrl)
    );
  }
}
