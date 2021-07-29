import React from "react";
import Menu from "src/components/menu";
import Details from "src/components/settings/details"
import Services from "src/components/settings/services"
import Subscriber from "src/components/settings/subscriber";
import Information from "src/components/settings/information";

const AdminSettings = () => {

  return (
    <section className="container-profile ">
      <Menu active="Settings"/>
      <div className="main-profile bg-white">
        <Details />
        <Services />
        <Subscriber />
        <Information />
      </div>
    </section>
  );
};

export default AdminSettings;
