import './styles.css';
import CompetitorEntry from './competitorEntry';

function CompetitorsList(props) {
  const entries = props.players.map((player, index) => {
    return <CompetitorEntry key={index} player={player}/>
  })

  return (
    <div className="competitors-list">
      {entries}
    </div>
  );
}

export default CompetitorsList;
