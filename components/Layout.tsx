import Head from "next/head";
import * as React from "react";
import {Container} from "../styles/Layout.module"
import {GlobalStyle} from "../styles/Global.module"

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = ""
  }) => (
  <>
    <Container>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <section className="container-profile ">
        {children}
      </section>
    </Container>
  </>
);

export default Layout;
