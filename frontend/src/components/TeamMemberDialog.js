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
    console.log(props.type);
    setEmails([]);
    const res = await props.fetchUsers(props.type);
    users = res.users;
    setEmails(users);
    users.forEach(function (user) {
      setEmails((emails) => [...emails, user]);
    });
    console.log("user emails" + emails);

    console.log();
  };

  const handleClose = () => {
    setOpen(false);

    console.log(memberName);

    console.log(guideName);
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
            getOptionLabel={(option) => option.email}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label={props.label}
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
            {props.dialogTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
