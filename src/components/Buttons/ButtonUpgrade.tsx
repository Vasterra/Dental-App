import React from "react";
import Router from 'next/router';

 const ButtonUpgrade = () => {
   const title = 'Upgrade';

   const redirect = () => {
     void Router.push(`https://dev.d2qap6yh626x1j.amplifyapp.com/purchase`);
   }

    return (
      <button className='button-green-outline' onClick={() => redirect()}>{title}</button>
    )
}
export default ButtonUpgrade
