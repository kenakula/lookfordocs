export type SocialType = 'email' | 'telegram' | 'watsapp';

export interface ISocial {
  type: SocialType;
  label: string;
  link: string;
}
