export default interface ButtonComponentProps{
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  variant?:string
}