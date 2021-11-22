import LeaderEntry from './leaderEntry';
import { useState, useEffect } from 'react';
import './styles.css';

function Leaders(props) {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const first = <LeaderEntry player={props.players[0]} isFirst />;
  const second = <LeaderEntry player={props.players[1]}/>
  return (
    <div className="leader-container">
      {windowDimensions.width > 600 ? second : first}
      {windowDimensions.width > 600 ? first : second}
      <LeaderEntry player={props.players[2]}/>
    </div>
  );
}

export default Leaders;
