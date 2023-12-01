import { PackageBilling } from './package-billing';
import { PackageService } from './package-service';
export interface PackageDetails {
  listOfPackageServices: PackageService[];
  packageBilling: PackageBilling;
}
