import Head from "next/head";
import * as React from "react";
import {Container} from "src/styles/Layout.module"
import {GlobalStyle} from "src/styles/Global.module"
import Drawer from "src/components/Drawer";

type Props = {
  title?: string;
  active?: string;
  currentAvatar?: any;
  currentDentist?: any;
};

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = "",
    active = "",
    currentAvatar = {},
    currentDentist = {},
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
