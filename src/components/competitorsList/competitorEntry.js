import Goal from '../goal';
import './styles.css';

function CompetitorEntry(props) {
  if(!props.player) return null;

  const stats = (props.player?.tier && props.player?.tier && props.player?.lp) ? (<>        <span>{`${props.player.tier} ${props.player.rank}`}</span>
  <span>{`${props.player.lp} LP`}</span></>) : <span>UNRANKED</span>;
  return (
    <div className="competitor-entry">
        <span>
          {`${props.player.pos}.`}
          <img className="avatar" src={props.player.img}  alt="player image"/>
          {`${props.player.name}` }
        </span>
        {stats}
        <Goal player={props.player} />
    </div>
  );
}

export default CompetitorEntry;
