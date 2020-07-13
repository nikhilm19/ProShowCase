import React from "react";
import Box from "@material-ui/core/Box";
import { useLightTopShadowStyles } from "@mui-treasury/styles/shadow/lightTop";

const LightTopShadow = (props) => {
  const styles = useLightTopShadowStyles({
    // inactive: true, // add this line to disable hover effect
  });
  return (
    <Box width={"auto"} borderRadius={2} height={"auto"} classes={styles}>
      {props.children}
    </Box>
  );
};

export default LightTopShadow;
