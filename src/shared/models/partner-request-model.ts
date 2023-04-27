export interface PartnerRequestModel {
  name: string;
  email: string;
  phone: string;
  specialty?: string;
  clinicName?: string;
  comment: string;
  type: 'doctor' | 'clinic';
}
