import './styles.css';
import Goal from '../goal';
import one from './1.png';
import two from './2.png';
import three from './3.png';
import crown from './crown.png';

const rankLabels = [one, two, three];
function LeaderEntry(props) {
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
    </div>
  );
}

export default LeaderEntry;
