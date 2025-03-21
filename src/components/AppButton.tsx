import Button from "./base/Button";

export default function AppButton(props: any) {
  return <Button {...props}>{props.children}</Button>;
}
