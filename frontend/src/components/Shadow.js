import React from "react";
import Box from "@material-ui/core/Box";
import { useLightTopShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";

const LightTopShadow = (props) => {
  const styles = useSoftRiseShadowStyles({
    // inactive: true, // add this line to disable hover effect
  });
  return (
    <Box width={"auto"} borderRadius={2} height={"auto"} classes={styles}>
      {props.children}
    </Box>
  );
};

export default LightTopShadow;
