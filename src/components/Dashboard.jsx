import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <IconButton />
          </IconButton>
          <Link to="/signup">
            <Button color="inherit" style={{ color: "white", border:"1px solid white" }}>
              Signup
            </Button>
          </Link>
          <Link to="signin">
            <Button color="inherit" style={{marginLeft:"15px", color: "white", border:"1px solid white" }}>
              Login
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Dashboard;
