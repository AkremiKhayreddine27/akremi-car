import { Name } from './name';
import { PhoneNumber } from "./phone";
import { Email } from './email';
import { Address } from './address';
import { Group } from '.';
import { Role } from './role';
export interface User {
  id: number;
  externalId: string;
  userName: string;
  title: string;
  userType: string;
  name: Name;
  phoneNumbers: PhoneNumber[];
  emails: Email[];
  addresses: Address[];
  groups: Group[],
  roles: Role[],
  photo?: string;
  active: Boolean;
  created: Date;
  lastModified: Date;
}
