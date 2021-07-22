import React, {useState} from 'react';
import redirect from "../../../lib/redirect";
import {CardBlock} from "../../../styles/CardPrices.module";
import {ButtonBig} from "../../../styles/Button.module";
import {Grid} from "@material-ui/core";

const Prices = (): any => {
  const [priceLookupKey, setPriceLookupKey] = useState('');

  if (priceLookupKey) {
    return redirect(priceLookupKey, "/subscribe");
  }

  return (
    <div>
      <h1>Select a plan</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={5}>
          <CardBlock>
            <h3>Premium</h3>
            <p>$15.00 / month</p>
            <ButtonBig onClick={() => setPriceLookupKey("basic")}>
              Select
            </ButtonBig>
          </CardBlock>
        </Grid>
        <Grid item xs={12} sm={6} lg={5}>
          <CardBlock>
            <h3>Basic</h3>
            <p>$5.00 / month</p>
            <ButtonBig onClick={() => setPriceLookupKey("premium")}>
              Select
            </ButtonBig>
          </CardBlock>
        </Grid>
      </Grid>
    </div>
  );
}

export default Prices;