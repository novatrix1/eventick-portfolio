import { IconType } from 'react-icons';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  icon: IconType;
  title: string;
  value: string;
  description: string;
  link: string;
}

export interface SocialMedia {
  name: string;
  icon: IconType;
  url: string;
  color: string;
}

export interface FAQ {
  question: string;
  answer: string;
}