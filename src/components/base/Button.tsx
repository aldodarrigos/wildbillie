import { Button as ButtonBase } from "@heroui/button";

export default function Button(props: any) {
  return <ButtonBase {...props}>{props.children}</ButtonBase>;
}
