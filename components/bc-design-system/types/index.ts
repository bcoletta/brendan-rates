export interface PropItem {
  text?: string
  value: string|number
}

export interface DropdownItem {
  image?: string;
  text: string;
  value: number;
}

export interface NotificationAction {
  route?: string
}

export interface NotificationType {
  message: string
  id?: number
  timeout?: number
  color?: string
  action?: NotificationAction
}

export interface Tab {
  id: number,
  name: string,
  active: boolean,
}

export interface TabListConfig {
  bgColor?: string,
  borderColor?: string,
  tabBgColor?: string,
  tabBorderColor?: string,
  activeTabBgColor?: string,
  activeTabBorderColor?: string,
}

export interface TabList {
  tabs: Tab[],
  config?: TabListConfig,
}