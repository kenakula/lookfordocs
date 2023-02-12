/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IImage {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title: string;
  type: string;
  folder: string;
  uploaded_by: string;
  uploaded_on: Date;
  modified_by?: string;
  modified_on: Date;
  charset?: string;
  filesize: number;
  width: number;
  height: number;
  duration?: number;
  embed?: boolean;
  description?: string;
  location?: string;
  tags?: string[];
  metadata: any;
}
