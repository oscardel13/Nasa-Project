import { 
  Logo,
  Words,
  Header as ArwesHeader,
  Highlight,
  withStyles,
} from "arwes";
import { Link } from "react-router-dom";
import Clickable from "./Clickable";
import Centered from "./Centered";
import { useHistory } from "react-router-dom";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    lineHeight: "80px",
  },
  logo: {
    display: "inherit",
    marginTop: "15px",
  },
  nav: {
    display: "inherit",
  },
  banner: {
    display: "inherit",
    fontWeight: "bold",
    marginLeft: "10px",
    marginRight: "15px",
    fontSize: 28,
  },
  clickable: {
    fontSize: 21,
    "& i": {
      marginRight: theme.padding / 2,
      fontSize: 24,
    },
  },
  link: {
    color: theme.color.content,
    textDecoration: "none",
  },
  button: {
    padding: [0, theme.padding / 2],
  },
  "@media (max-width: 900px)": {
    // logo: {
    //   display: "none",
    // },
    button: {
      padding: [0, 8],
    },
    clickable: {
      fontSize: 16,
    }
  },
  "@media (max-width: 850px)": {
    logo: {
      display: "none",
    },
    button: {
      padding: [0, 8],
    },
    clickable: {
      fontSize: 16,
    }
  },
  "@media (max-width: 800px)": {
    logo: {
      display: "none",
    },
    img: {
      display: "none",
    },
    banner: {
      display: "none",
    },
    button: {
      padding: [0, 8],
    },
    clickable: {
      fontSize: 16,
    }
  },
  "@media (max-width: 450px)": {
    logo: {
      display: "none",
    },
    img: {
      display: "none",
    },
    banner: {
      display: "none",
    },
    button: {
      padding: [0, 7],
    },
    clickable: {
      fontSize: 14,
    }
  },
  "@media (max-width: 402px)": {
    logo: {
      display: "none",
    },
    img: {
      display: "none",
    },
    banner: {
      display: "none",
    },
    button: {
      padding: [0,2],
    },
    clickable: {
      fontSize: 12,
    }
  },
});

const Header = props => {
  const history = useHistory();
  const { classes, onNav, ...rest } = props;
  const logoutRedirect = () => {
    history.push("/v1/auth/logout")
    history.go(0)
  }
  return <ArwesHeader animate>
    <Centered className={classes.root} {...rest} style={{maxWidth: "900px"}}>
      <img src="/favicon.png" alt="" className={classes.img} style={{
        margin: "15px 10px 15px 0",
        height: "50px",
        width: "auto",
      }} />
      <Logo animate size={50} className={classes.logo} layer="header" />
      <Words animate className={classes.banner}>
        NASA Mission Control
      </Words>
      <nav className={`${classes.nav}`}>
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/dashboard/launch">
              <i className="material-icons">check_circle_outline</i>Launch
            </Link>
          </Highlight>
        </Clickable>
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/dashboard/upcoming">
            <i className="material-icons">update</i>Upcoming</Link>
          </Highlight>
        </Clickable>
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/dashboard/history">
            <i className="material-icons">history</i>History</Link>
          </Highlight>
        </Clickable>
        <Clickable className={classes.clickable} onClick={logoutRedirect}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link}>
            <i className="material-icons">logout</i>Logout</Link>
          </Highlight>
        </Clickable>
      </nav>
    </Centered>
  </ArwesHeader>
};

export default withStyles(styles)(Header);