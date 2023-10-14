import { Eventing } from './Eventing';
import { Synch } from './Synch';

export interface IUserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  events: Eventing = new Eventing();
  synch: Synch<IUserProps> = new Synch(rootUrl);

  constructor(private data: IUserProps) {}

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: IUserProps): void {
    Object.assign(this.data, update);
  }
}
