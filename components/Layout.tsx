import Head from "next/head";
import * as React from "react";
import {Container} from "../styles/Layout.module"
import {GlobalStyle} from "../styles/Global.module"
import Drawer from "components/Drawer";

type Props = {
  title?: string;
  active?: string;
  currentAvatar?: any;
};

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = "",
    active = "",
    currentAvatar = {},
  }) => (
  <>
    <Container>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <section className="container-profile ">
        <Drawer
          // @ts-ignore
          currentAvatar={currentAvatar}
          active={active}
        />
        {children}
      </section>
    </Container>
  </>
);

export default Layout;
