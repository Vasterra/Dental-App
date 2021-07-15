import React from "react";
import {Grid, Typography} from "@material-ui/core";
import EmptyAvatar from '../../../Form/Avatar';
import {ButtonBigGreen, ButtonMediumGreen} from "../../../../styles/Button.module";
import {BlockWrapperGreen} from "../../../../styles/Main.module";
import {AddWatermarkBlock, BigSquare, BlockEmptyImage} from "../../../../styles/AddWatermark.module";
import {Stripe} from "../../../../styles/Main.module";

const AddWatermark = () => {
  return (
    <BlockWrapperGreen>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} lg={6}>
          <AddWatermarkBlock>
            <Typography variant="h6" gutterBottom>
              Profile Thumbnail
            </Typography>
            <EmptyAvatar/>
            <ButtonMediumGreen>Upload Thumbnail</ButtonMediumGreen>
            <Stripe/>
            <Typography variant="subtitle1" gutterBottom>
              Custom Watermark
            </Typography>
            <BigSquare>WATERMARK IMAGE</BigSquare>
            <ButtonMediumGreen>Upload Thumbnail</ButtonMediumGreen>
          </AddWatermarkBlock>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <AddWatermarkBlock>
            <Typography variant="h6" gutterBottom>
              Featured Image
            </Typography>
            <BlockEmptyImage/>
            <ButtonBigGreen>Select Featured Image</ButtonBigGreen>
          </AddWatermarkBlock>
        </Grid>
      </Grid>
    </BlockWrapperGreen>
  )
}

export default AddWatermark
