import { User, IUserProps } from '../models/User';
import { UserForm } from './UserForm';
import { UserShow } from './UserShow';
import { View } from './View';

export class UserEdit extends View<User, IUserProps> {
  regionsMap(): { [key: string]: string } {
    return {
      UserShow: '.user-show',
      UserForm: '.user-form',
    };
  }

  onRender(): void {
    new UserShow(this.regions.UserShow, this.model).render();
    new UserForm(this.regions.UserForm, this.model).render();
  }

  template(): string {
    return `
            <div>
                <div class="user-show"></div>
                <div class="user-form"></div>
            </div>
        `;
  }
}
