import { Input as InputBase } from "@heroui/input";

export default function Input(props: any) {
  return <InputBase {...props}>{props.children}</InputBase>;
} 