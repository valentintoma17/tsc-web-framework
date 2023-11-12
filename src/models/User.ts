import { Model } from './Model';
import { Attributes } from './Attributes';
import { Sync } from './APISync';
import { Eventing } from './Eventing';
import { Collection } from './Collection';

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

  static buildUserCollection() {
    return new Collection<User, IUserProps>(rootUrl, (json: IUserProps) =>
      this.buildUser(json)
    );
  }

  randomAge() {
    const randomAge = Math.floor(Math.random() * 100);
    this.set({ age: randomAge });
  }
}
