import { Collection } from '../models/Collection';

export abstract class CollectionView<T, I> {
  constructor(public parent: Element, public collection: Collection<T, I>) {}

  abstract renderItem(model, itemParent): void;

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');

    for (const model of this.collection.models) {
      const itemParent = document.createElement('div');
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    this.parent.append(templateElement.content);
  }
}
