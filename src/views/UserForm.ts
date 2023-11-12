import { IUserProps, User } from '../models/User';
import { View } from '../views/View';

export class UserForm extends View<User, IUserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick,
      'click:#random': this.onRandomAgeClick,
      'click:.change-name': this.onChangeNameClick,
      'click:.save-user': this.onSaveClick,
      'mouseenter:h1': this.onHoverHeader,
    };
  }

  onButtonClick(): void {
    console.log('Button clicked');
  }

  onRandomAgeClick = (): void => {
    this.model.randomAge();
  };

  onChangeNameClick = (): void => {
    const inputName = this.parent.querySelector('.name-input');
    if (inputName) {
      this.model.set({ name: inputName.value });
    }
  };

  onSaveClick = (): void => {
    this.model.save();
  };

  onHoverHeader(): void {
    console.log('H1 hovered');
  }

  template() {
    return `
        <div>
            <input class="name-input" placeholder=${this.model.get('name')}/>
            <button class="change-name">Button</button>  
            <button id="random">Set Random Age</button>  
            <button class="save-user">Save</button>  
        </div>
        `;
  }
}
