import { LayoutStore } from "../store/layoutStore";

const layoutStore = new LayoutStore();

export const currentLocaleByStore = () => layoutStore.currentLocale

export const currentLocale = currentLocaleByStore;

export default currentLocaleByStore;
