import { red } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { findAllPosts } from "../data_services/PostDataService";
import CreatePosts from "./CreatePost";
import PostCard from "./PostCard";
import PostsHeader from "./PostsHeader";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {},
    root: {
      maxWidth: 345,
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
  })
);

export default function Posts() {
  const classes = useStyles();
  const [post, setPost] = useState([]);

  const [currentUser, setCurrentUser] = useState("");

  const getPost = async () => {
    try {
      const res = await findAllPosts();
      const published = res.data.filter((item) => {
        if (item.draft === false) {
          return item;
        }
      });
      setPost(published);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const { id } = jwt_decode(localStorage.getItem("token"));
    setCurrentUser(id);
    getPost();
  }, []);

  return (
    <>
      <PostsHeader />
      <div className={classes.container}>
        <CreatePosts getPost={getPost} />

        <div className={classes.cardCtn}>
          {post.length > 0 &&
            post.map((post, index) => (
              <PostCard
                key={post + index}
                post={post}
                currentUser={currentUser}
                getPost={getPost}
              />
            ))}
        </div>
      </div>
    </>
  );
}
