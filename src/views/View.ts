import { HasId, Model } from '../models/Model';

export abstract class View<T extends Model<K>, K extends HasId> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvent(fragment: DocumentFragment) {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment) {
    const regionsMap = this.regionsMap();

    for (let k in regionsMap) {
      const selector = regionsMap[k];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[k] = element;
      }
    }
  }

  onRender(): void {}

  render() {
    this.parent.innerHTML = '';

    const temp = document.createElement('template');
    temp.innerHTML = this.template();

    this.bindEvent(temp.content);
    this.mapRegions(temp.content);

    this.onRender();

    return this.parent.append(temp.content);
  }
}
