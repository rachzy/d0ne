import { IAuthentication } from "../App";

export interface IPage {
  setAuthentication: React.Dispatch<React.SetStateAction<IAuthentication>>;
}
