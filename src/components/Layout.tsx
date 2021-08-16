import * as React from 'react';
import Drawer from 'src/components/Drawer';
import { Container } from '../styles/Main.module';

type Props = {
  title?: string;
  active?: string;
  currentAvatar?: any;
  currentDentist?: any;
};

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = '',
    active = '',
    currentAvatar = {},
    currentDentist = {}
  }) => (
  <>
    <Container>
      <section className="container-profile ">
        <Drawer
          // @ts-ignore
          currentAvatar={currentAvatar}
          currentDentist={currentDentist}
          active={active}
        />
        {children}
      </section>
    </Container>
  </>
);

export default Layout;
