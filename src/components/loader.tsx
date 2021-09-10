import { CircularProgress, CircularProgressProps, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStylesFacebook = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      margin: '0'
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
    },
    top: {
      color: '#1a90ff',
      animationDuration: '550ms',
    },
    circle: {
      strokeLinecap: 'round'
    }
  })
);

function FacebookCircularProgress(props: CircularProgressProps) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant='indeterminate'
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle
        }}
        size={20}
        thickness={4}
        {...props}
      />
    </div>
  );
}

export default FacebookCircularProgress