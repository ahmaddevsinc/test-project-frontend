import { Avatar, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { addPost } from "../data_services/PostDataService";

const useStyles = makeStyles(() => ({
  createPost: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
  },
  inputPost: {
    border: "1px solid grey",
    borderRadius: "50px",
    padding: "0 50px",
    marginLeft: "20px",
    outline: "none",
    cursor: "pointer",
  },
  writeDescription: {
    borderRadius: "20px",
    padding: "0 10px",
    outline: "none",
    width: "485px",
    border: "1px solid darkgrey",
    height: "50px",
  },
  imageBtn: {
    background: "black",
    color: "white",
    "&:hover": {
      color: "black",
    },
  },
}));

const styles = (theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: "red",
    },
    createPost: {
      display: "",
    },
  });

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <button
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          X
        </button>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CreatePosts = ({ getPost }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    title: {
      required: "title is required",
    },
    description: {
      required: "description is required",
    },
  };

  const handleError = () => {};

  const handlePublishPost = async (data) => {
    try {
      const values = { ...data, draft: false };
      const res = await addPost(values);
      if (res.status === 200) {
        handleClose();
        getPost();
        alert("post created successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDraftPost = async (data) => {
    try {
      const values = { ...data, draft: true };
      const res = await addPost(values);
      if (res.status === 200) {
        handleClose();
        getPost();
        alert("post created successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Box className={classes.createPost}>
        <Avatar />
        <input
          placeholder="Whats on your mind"
          onClick={handleClickOpen}
          className={classes.inputPost}
        />
      </Box>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create a Post
        </DialogTitle>
        <form action="#">
          <DialogContent dividers>
            <Typography gutterBottom>Title</Typography>
            <input
              placeholder="Write your title?"
              className={classes.writeDescription}
              name="title"
              {...register("title", registerOptions.title)}
            />
            <label style={{ color: "red" }}>
              {errors?.title && errors.title.message}
            </label>
            <Typography gutterBottom>Description</Typography>
            <input
              placeholder="What's on your mind?"
              className={classes.writeDescription}
              name="description"
              {...register("description", registerOptions.description)}
            />
            <label style={{ color: "red" }}>
              {errors?.description && errors.description.message}
            </label>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              style={{ border: "1px solid black" }}
              autoFocus
              color="primary"
              onClick={handleSubmit(handlePublishPost, handleError)}
            >
              publish
            </Button>
            <Button
              type="submit"
              style={{ border: "1px solid black" }}
              autoFocus
              color="primary"
              onClick={handleSubmit(handleDraftPost, handleError)}
            >
              draft
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreatePosts;
