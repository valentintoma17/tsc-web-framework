import { AxiosPromise, AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { Callback, Eventing } from './Eventing';
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
  attr: Attributes<IUserProps>;

  constructor(attrs: IUserProps) {
    this.attr = new Attributes(attrs);
  }

  get get() {
    return this.attr.get;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  set(update: IUserProps) {
    this.attr.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id != 'number') {
      throw new Error('Cannot fetch without id');
    }

    this.synch.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data);
    });
  }

  save(): void {
    this.synch
      .save(this.attr.getAll())
      .then((response: AxiosResponse) => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
