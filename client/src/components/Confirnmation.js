import { Button, Appear  } from "arwes";

const ConfirmBox = props => {
  return (
    <Appear id="launch" animate show={props.entered}>
        <div style={{ width: 300, height: 130 }}>
            <div>
            <h3> Confirm</h3>
            <p>Once you confirm it cannot be reverted!</p>
            </div>
            <div className={"Buttons Container"} >
                <Button /*FrameComponent={FrameHexagon}*/>
                    Confirm
                </Button>
                <div style={{"width":"60px", "height":"auto", "display":"inline-block"}}/>
                <Button /*FrameComponent={FrameHexagon}*/>
                    Cancel
                </Button>
            </div>
        </div>
    </Appear>
  );
};

export default ConfirmBox;
