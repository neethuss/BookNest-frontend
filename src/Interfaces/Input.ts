export default interface InputComponentProps{
  id?:string
  type?: string;
  value?: string | number;
  accept?:string
  name?:string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}