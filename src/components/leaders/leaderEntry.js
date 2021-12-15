import './styles.css';
import Goal from '../goal';
import one from './1.png';
import two from './2.png';
import three from './3.png';
import crown from './crown.png';
import React, { useCallback, useRef, useEffect } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

const rankLabels = [one, two, three];
function LeaderEntry(props) {

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.3 },
        particleCount: Math.floor(100 * particleRatio)
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(3, {
      spread: 50,
      scalar: .8,
    });
  }, [makeShot]);

  useEffect(() => {
    if(props.isFirst && props.player && props.player.progress >= 100) {
      fire();
    }
  });

  if (!props.player) return null;

  const stats = (props.player?.tier && props.player?.rank && props.player?.lp !== undefined) ? (<div className="leader-desc">
  <p>
    {`${props.player?.pos}. `}
    {`${props.player?.name}` }
  </p>
  <p>{`${props.player?.tier} ${props.player?.rank} ${props.player?.lp} LP`}</p>
</div>) : (<div className="leader-desc">
      <p>
          {`${props.player?.pos}. `}
          {`${props.player?.name}` }
        </p>
        <p>{'UNRANKED'}</p>
      </div>);
  return (
    <div className="leader-entry">
      <img className="leader-rank" src={rankLabels[props.player?.pos - 1]} alt="top rank ticker"/>
      {props.isFirst ? <img className="leader-crown" src={crown} alt="crown"/> : null}
      <img className="leader-avatar" src={props.player?.img} alt="player"/>
      {stats}
      <Goal styles={{ alignItems: 'center', color: '#D3D3D3' }} player={props.player}/>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
}

export default LeaderEntry;
