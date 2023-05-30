import { Middleware } from '@nuxt/types'
import BreadcrumStore from '../store/breadcrumStore';

export const requiredAuth: Middleware = ({route}) => {
  const breadcrumb = route.meta?.reduce(
    (breadcrumb: Array<string>, meta: any) => {
      return meta.breadcrumb || breadcrumb
    }, []) || []

  if (breadcrumb) {
    const breadcrumbStore = new BreadcrumStore();
    breadcrumbStore.setBreadcrumb(breadcrumb);
  }
}

export default requiredAuth