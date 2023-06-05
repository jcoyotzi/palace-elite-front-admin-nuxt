import { Store, Pinia } from "pinia-class-component";
import { BreadcrumItem } from "~/src/app/breadcrumb/domain/entities/BreadcrumItem";

@Store({
  name: 'BreadcrumStore',
  i18n: {
  }
})
export default class BreadcrumStore extends Pinia {
  public storeBreadcrumb: string[] = [];
  public storeItems: BreadcrumItem[] = [];

  get breadcrumb() {
    return this.storeBreadcrumb;
  }

  setBreadcrumb(breadcrumb: string[]) {
    this.storeBreadcrumb = breadcrumb;
  }

  get items() {
    return this.storeItems;
  }

  setItems(items: BreadcrumItem[]) {
    this.storeItems = items;
  }
}
