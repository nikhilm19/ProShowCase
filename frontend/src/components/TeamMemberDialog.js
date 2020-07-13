import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [guideName, setGuideName] = React.useState(null);

  const [memberName, setMemberName] = React.useState(null);
  const [emails, setEmails] = React.useState([]);
  let users = [];

  const handleClickOpen = async () => {
    setOpen(true);
    const res = await props.fetchUsers();

    users = res.users.filter((user) => {
      if (user.email) {
        //console.log(user.email);
        return user.email;
      }
    });
    users.forEach(function (user) {
      setEmails((emails) => [...emails, user.email]);
    });
    console.log("user emails" + emails);

    console.log();
  };

  const handleClose = () => {
    setOpen(false);
    props.onAddMember(guideName);
    props.onAddMember(memberName);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {props.dialogTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.dialogTitle}</DialogTitle>

        <DialogContent>
          <DialogContentText>{props.dialogText}</DialogContentText>

          <Autocomplete
            onChange={(event, value) => {
              setMemberName(value);
              console.log(value);
            }}
            multiple={props.isMultiple}
            id="tags-filled"
            size="small"
            options={emails}
            defaultValue={["Loading.."]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Email address(es)
                "
                placeholder="Type here"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add Member
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
