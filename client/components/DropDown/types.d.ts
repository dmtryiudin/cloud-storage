export interface IDropDown {
  variants: string[];
  currentValue: string;
  setCurrentValue: (name: string) => void;
  labelText: string;
}
