export interface IPage {
  redirect: (urn: string) => void;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
