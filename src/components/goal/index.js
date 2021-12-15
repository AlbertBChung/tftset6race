import ProgressBar from "@ramonak/react-progress-bar";
import './styles.css';

function Goal(props) {
  return (
    <div className="goal" style={props.styles}>
      <ProgressBar
        completed={Math.floor(props.player.progress)} 
        animateOnRender
        bgColor={'#669195'}
        isLabelVisible={true}
        height={'8px'}
        width={'80px'}
        transitionDuration={'2s'}
        labelSize={'6px'}
      />
      <span>{`Goal: ${props.player.goal}`}</span>
    </div>
  );
}

export default Goal;
