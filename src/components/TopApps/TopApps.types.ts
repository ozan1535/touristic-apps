export interface IApp {
  id: string;
  [key: string]: any;
}

export interface ITopAppsProps {
  topApps: IApp[];
}
