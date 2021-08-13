import styled from 'styled-components';
import Close from '@material-ui/icons/Close';

export const CloseButton = styled(Close)`
  cursor: pointer;
  position: absolute;
  margin-left: -25px;
  margin-top: 6px;
  transition: 0.3s linear;

  &:hover & {
  transform: rotate(90deg);
}`