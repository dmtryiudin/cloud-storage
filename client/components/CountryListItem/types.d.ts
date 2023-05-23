export interface ICountryListItem {
  title: string;
  setCurrentValue: (name: string) => void;
  setIsDropDownOpened: React.Dispatch<React.SetStateAction<boolean>>;
}
