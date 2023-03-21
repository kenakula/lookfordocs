export interface RequestFormModel {
  name: string;
  email: string;
  phone: string;
  connectType: 'phone' | 'watsapp' | 'telegram';
  comment: string;
}
