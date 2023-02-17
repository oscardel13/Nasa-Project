import { Appear, Button, Loading, Paragraph } from "arwes";
import { useHistory } from "react-router-dom";
import { httpGuest } from "../hooks/requests";
import Clickable from "../components/Clickable";

const Auth = props => {
  let history = useHistory();

  const googleAuthRedirect = () => {
    history.push("/v1/auth/google")
    history.go(0)
  }

  const googleGuestRedirect = () => {
    history.push("/v1/auth/guest")
    history.go(0)
  }

  return <Appear id="auth" animate show={props.entered}>
    <div className="email-password-login-contaner" style={{"paddingLeft":"50px"}}>
      <h1>Log In</h1>
      <Paragraph>Please Log in with Google otherwise click guest</Paragraph>
      <Paragraph><small>Guest will not be able to see any real data</small></Paragraph>

        <Clickable>
          <Button animate 
            show={props.entered} 
            onClick={googleAuthRedirect}>
            Continue with Google
          </Button>
        </Clickable>
        {props.isPendingLaunch &&
          <Loading animate small />
        }
        <div className="divider" style={{"width":"30px", "height":"auto", "display":"inline-block"}}/>
        <Clickable>
          <Button animate 
            show={props.entered}
            onClick={googleGuestRedirect}>
            Guest
          </Button>
        </Clickable>
        {props.isPendingLaunch &&
          <Loading animate small />
        }
    </div>
  </Appear>
};

export default Auth;