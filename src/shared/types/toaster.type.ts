import { AlertColor } from '@mui/material';

export interface ToasterMessage {
  message: string;
  severety: AlertColor;
  key: number;
}
