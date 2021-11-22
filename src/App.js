import logo from './logo.svg';
import background from './background.png';
import './App.css';
import Leaders from './components/leaders';
import CompetitorsList from './components/competitorsList';
import React from 'react';

const tierMapping = {
  'CHALLENGER': 90,
  'GRANDMASTER': 80,
  'MASTER': 70,
  'DIAMOND': 60,
  'PLATINUM': 50,
  'GOLD': 40,
  'SILVER': 30,
  'BRONZE': 20,
  'IRON': 10,
}
const rankMapping = {
  'I': 8,
  'II': 6,
  'III': 4,
  'IV': 2,
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    const metadata = JSON.parse(process.env.REACT_APP_PLAYER_DATA);
    const promises = metadata.players.map(p => {
      return fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${p.ign}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`)
        .then(res => res.json())
        .then(summonerData => {
          return fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerData.id}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`)
            .then(res => res.json())
            .then(summonerData => {
              const s = summonerData[0];
              if(!s) return {
                img: p.avatarUrl,
                name: p.ign,
                goal: p.goal,
              }
              return {
                img: p.avatarUrl,
                name: s.summonerName,
                tier: s.tier,
                rank: s.rank,
                lp: s.leaguePoints,
                goal: p.goal,
              }
            })
        })
    })
    Promise.all(promises).then((summonerData) => {    
      summonerData.sort((p1, p2) => {
        const rank1 = (Number(`${tierMapping[p1.tier]}`) + Number(`${rankMapping[p1.rank]}`)  + Number(`0.${p1.lp}`)) || 0;
        const rank2 = (Number(`${tierMapping[p2.tier]}`) + Number(`${rankMapping[p2.rank]}`)  + Number(`0.${p2.lp}`)) || 0;
        return rank1 > rank2 ? -1 : 1;
      });

      const players = summonerData.map((s, index) => {
        s.pos = index+1;
        const rank = (Number(`${tierMapping[s.tier]}`) + Number(`${rankMapping[s.rank]}`)  + Number(`0.${s.lp}`)) || 0;
        const goal = (Number(`${tierMapping[s.goal]}`) + Number(`${rankMapping['IV']}`));
        s.progress = Math.min(Math.round(rank / goal * 100), 100);
        return s;
      })

      this.setState({
        players
      });
    });
  }
  

  render(){    
    return (
      <div className="App">
        <header className="App-header">
          <Leaders players={this.state.players.slice(0, 3)}/>
          <br/>
          <CompetitorsList players={this.state.players.slice(3, this.state.players.length)}/>
        </header>
      </div>
    );
  }
}

export default App;
