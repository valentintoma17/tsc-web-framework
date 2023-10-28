import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

export class Collection<T, I> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootURL: string, public deserialize: (json: I) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootURL).then((res: AxiosResponse) => {
      res.data.forEach((value: I) => {
        this.models.push(this.deserialize(value));
      });
    });
    this.trigger('change');
  }
}
