import styled from 'styled-components';

export const MenuAvatar = styled('img')`
  width: 100px;
  height: 100px;
  max-width: 100%;
  border-radius: 50%;
`;

export const MenuAvatar__DownloadLabel = styled('label')`
  padding: 1.2em;
  transition: border 300ms ease;
  cursor: pointer;
  text-align: center;
  position: absolute;
  display: flex;
  outline: none;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  top: 156px;
  width: 100px;
  border-top: none;
  border-left: none;
  border-right: none;
  height: 66px;
  border-radius: 39px 22px 320px 320px;
  svg {
    display: none;
  }
  &:hover {
    opacity: 0.9;
    background: #095c5c;
    svg {
      display: block;
    }
  }
`;

export const MenuAvatar__DownloadInput = styled('input')`
  outline: 0;
  opacity: 0;
  pointer-events: none;
  user-select: none;
`;