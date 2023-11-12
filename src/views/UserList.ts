import { IUserProps, User } from '../models/User';
import { CollectionView } from './CollectionView';
import { UserShow } from './UserShow';
import { View } from './View';

export class UserList extends CollectionView<User, IUserProps> {
  renderItem(model: User, itemParent: Element): void {
    const view = new UserShow(itemParent, model).render();
  }
}
