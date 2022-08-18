import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React, { useState } from "react";
import {
  addComment,
  deleteCommentById,
  editCommentById,
  findCommentsById,
} from "../data_services/CommentDataService";
import { deletePostById, editPostById } from "../data_services/PostDataService";
import { ReactComponent as ExtendIcon } from "../icons/extend.svg";
import { ReactComponent as FavouriteIcon } from "../icons/favourite.svg";
import { ReactComponent as ShareIcon } from "../icons/share.svg";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "581px",
      marginBottom: "20px",
      background: "#f3f3f38f",
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardCtn: {
      display: "flex",
      justifyContent: "center",
      padding: "50px 0",
      flexDirection: "column",
      alignItems: "center",
    },
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
    commentBtn: {
      border: "1px solid black",
      padding: "5px",
      color: "blue",
      marginLeft: "10px",
    },
  })
);

const PostCard = ({ post, getPost, currentUser }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [viewComment, setViewComment] = useState([]);
  const [comment, setComment] = useState({
    name: "",
    text: "",
    userId: 0,
    postId: 0,
  });
  const [open, setOpen] = React.useState(false);
  const [commentOpen, setCommentOpen] = React.useState(false);

  const [editPost, setEditPost] = useState({
    title: post.title,
    description: post.description,
    id: "",
  });

  const [editComment, setEditComment] = useState({
    text: "",
    id: "",
    postId: "",
  });

  const handleClickUpdatePostOpen = (id) => {
    setOpen(true);
    setEditPost({
      ...editPost,
      id,
    });
  };

  const handleClickUpdateCommentOpen = (id, postId, item) => {
    setCommentOpen(true);
    setEditComment({
      // ...editComment,
      text: item.text,
      id,
      postId,
    });
  };

  const handleCommentClose = () => {
    setCommentOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (postId, userId, name) => {
    try {
      const values = { ...comment, postId, userId, name };
      const { text } = values;

      if (!text) {
        alert("please enter your comment text");
      } else {
        const res = await addComment(values);
        if (res) {
          alert("comment created successfully");
          await getComment(postId);
        } else {
          alert("Error while creating comment");
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const getComment = async (postId) => {
    try {
      const res = await findCommentsById(postId);
      if (res) {
        setViewComment(res.data);
      } else {
        setViewComment([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleExpandClick = async (postId) => {
    try {
      await getComment(postId);
      setExpanded(!expanded);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await deletePostById(id);
      if (res) {
        alert("post deleted successfully");
        getPost();
      }
    } catch (error) {
      alert("user can only delete his own post");
      console.log(error.message);
    }
  };

  const handleUpdateChange = (e) => {
    setEditPost({
      ...editPost,
      [e.target.name]: e.target.value,
    });
  };

  const handlePublishPost = async () => {
    try {
      const { title, description, id } = editPost;
      const values = { title, description, draft: false };
      if (!title | !description) {
        alert("please enter required fields");
      } else {
        const res = await editPostById(id, values);
        if (res) {
          alert("post published successfully");
          handleClose();
          getPost();
        } else {
          alert("user can only publish his own post.");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDraftPost = async () => {
    try {
      const { title, description, id } = editPost;
      const values = { title, description, draft: true };
      if (!title | !description) {
        alert("please enter required fields");
      } else {
        const res = await editPostById(id, values);
        if (res) {
          alert("post moved to drafts successfully");
          handleClose();
          getPost();
        } else {
          alert("user can only draft his own post.");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteComment = async (id, postId) => {
    try {
      const res = await deleteCommentById(id);
      if (res) {
        alert("comment deleted successfully");
        await getComment(postId);
      } else {
        alert("user can only delete his own comment.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCommentUpdateChange = (e) => {
    setEditComment({
      ...editComment,
      [e.target.name]: e.target.value,
    });
  };

  const updateComment = async () => {
    try {
      const { text, id, postId } = editComment;
      const values = { text };
      if (!text) {
        alert("please enter required field");
      } else {
        const res = await editCommentById(id, values);
        if (res.status === 200) {
          alert("comment updated successfully");
          handleCommentClose();
          await getComment(postId);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <>
              {currentUser === post.user.id && (
                <IconButton
                  aria-label="settings"
                  onClick={() => handleClickUpdatePostOpen(post.id)}
                >
                  edit
                </IconButton>
              )}
              {currentUser === post.user.id && (
                <IconButton
                  aria-label="settings"
                  onClick={() => deletePost(post.id)}
                >
                  delete
                </IconButton>
              )}
            </>
          }
          title={post.user.name}
          subheader={post.createdAt}
        />
        <CardContent>
          <label style={{ paddingBottom: "0.7rem 0" }}>Title:</label>
          <Typography
            style={{ marginBottom: "1rem" }}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {post.title}
          </Typography>
          <label>Description:</label>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavouriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => handleExpandClick(post.id)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExtendIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>
            <input
              name="text"
              placeholder="Write a comment"
              onChange={handleInputChange}
            />
            <button
              className={classes.commentBtn}
              onClick={() => handleSubmit(post.id, post.userId, post.user.name)}
            >
              Post
            </button>
          </CardContent>
          <CardContent>
            {viewComment.map((item) => (
              <>
                <CardHeader
                  avatar={
                    <>
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    </>
                  }
                  action={
                    <>
                      {currentUser === item.user_comments.id && (
                        <IconButton
                          aria-label="settings"
                          onClick={() =>
                            handleClickUpdateCommentOpen(
                              item.id,
                              item.postId,
                              item
                            )
                          }
                        >
                          edit
                        </IconButton>
                      )}
                      {currentUser === item.user_comments.id && (
                        <IconButton
                          aria-label="settings"
                          onClick={() => deleteComment(item.id, item.postId)}
                        >
                          delete
                        </IconButton>
                      )}
                    </>
                  }
                  title={item.user_comments.name}
                  subheader={item.user_comments.createdAt}
                />
                <label>Comment:</label>
                <label
                  style={{ marginLeft: "10px", color: "rgba(0, 0, 0, 0.54)" }}
                >
                  {item.text}
                </label>
              </>
            ))}
          </CardContent>
        </Collapse>
      </Card>
      {/* dialog for edit post */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Update a Post
        </DialogTitle>
        <form action="#">
          <DialogContent dividers>
            <Typography gutterBottom>Title</Typography>
            <input
              placeholder="update your title?"
              className={classes.writeDescription}
              name="title"
              onChange={handleUpdateChange}
              value={editPost.title}
            />
            <Typography gutterBottom>Description</Typography>
            <input
              placeholder="update your description"
              className={classes.writeDescription}
              name="description"
              value={editPost.description}
              onChange={handleUpdateChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              style={{ border: "1px solid black" }}
              autoFocus
              color="primary"
              onClick={handlePublishPost}
            >
              publish
            </Button>
            <Button
              style={{ border: "1px solid black" }}
              autoFocus
              color="primary"
              onClick={handleDraftPost}
            >
              draft
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* dialog for edit comment */}
      <Dialog
        onClose={handleCommentClose}
        aria-labelledby="customized-dialog-title"
        open={commentOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCommentClose}>
          Update a Comment
        </DialogTitle>
        <form action="#">
          <DialogContent dividers>
            <Typography gutterBottom>Text</Typography>
            <input
              placeholder="update your text"
              className={classes.writeDescription}
              name="text"
              onChange={handleCommentUpdateChange}
              value={editComment.text}
            />
          </DialogContent>
          <DialogActions>
            <Button
              style={{ border: "1px solid black" }}
              autoFocus
              color="primary"
              onClick={updateComment}
            >
              update a Comment
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default PostCard;
