import { StatusDescription } from './../../other/status-description';
import { MyPreferencesAside } from '../my-preferences-aside';
export interface MyPreferencesCountRESPONSePOST {
  statusDescription: StatusDescription;
  preferenceCount: MyPreferencesAside[];
}
