import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import { useGoogleAvatarStyles } from "@mui-treasury/styles/avatar/google";

export default function GoogleAvatar(props) {
  const google = useGoogleAvatarStyles();
  const googleLarge = useGoogleAvatarStyles({ ringSize: 88, avatarSize: 76 });
  return (
    <>
      <div className={google.root}>
        <Avatar>{props.text}</Avatar>
      </div>
    </>
  );
}
