export interface PartnerRequestModel {
  name: string;
  email: string;
  phone: string;
  specialty?: string;
  comment: string;
  type: 'doctor' | 'clinic';
}
