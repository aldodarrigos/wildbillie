import ButtonGroup from './base/ButtonGroup';

export default function AppButtonGroup(props: any) {
  return <ButtonGroup {...props}>{props.children}</ButtonGroup>;
}
