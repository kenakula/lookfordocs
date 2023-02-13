export interface ISiteSettings {
  id: number;
  status: string;
  user_created: string;
  date_created: Date;
  user_updated?: string;
  date_updated?: Date;
  navigation: INavigation[];
}

export interface INavigation {
  name: string;
  url: string;
  isAccent: boolean;
}
