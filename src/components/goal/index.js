import ProgressBar from "@ramonak/react-progress-bar";

function Goal(props) {
  return (
    <div>
      <ProgressBar 
        completed={props.player.progress} 
        animateOnRender
        bgColor={'#669195'}
        isLabelVisible={true}
        height={'8px'}
        width={'100px'}
        transitionDuration={'2s'}
        labelSize={'6px'}
      />
      <span>{`Goal: ${props.player.goal}`}</span>
    </div>
  );
}

export default Goal;
