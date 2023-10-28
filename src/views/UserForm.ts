export class UserForm {
  constructor(public parent: Element) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick,
      'mouseenter:h1': this.onHoverHeader,
    };
  }

  onButtonClick(): void {
    console.log('Hi');
  }

  onHoverHeader(): void {
    console.log('Hover');
  }

  template() {
    return `
        <div>
            <h1>User Form</h1>
            <input><button>Button</button>
        </div>
        `;
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

  render() {
    const temp = document.createElement('template');
    temp.innerHTML = this.template();

    this.bindEvent(temp.content);

    return this.parent.append(temp.content);
  }
}
