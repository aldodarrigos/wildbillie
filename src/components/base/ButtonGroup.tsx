import { ButtonGroup as ButtonGroupBase } from '@heroui/button';

export default function ButtonGroup(props: any) {
  return <ButtonGroupBase {...props}>{props.children}</ButtonGroupBase>;
}
