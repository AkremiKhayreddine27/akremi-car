import { File } from './file';
import { Category } from './category';
import { DocumentType } from './documen-type';
export interface Document {
  id: number;
  title: string;
  description?: string;
  type?: DocumentType;
  createdAt?: any;
  owner?: any;
  icon?: string;
  file?: File;
  link?: string;
  category?: Category;
}
