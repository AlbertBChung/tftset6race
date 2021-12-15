import './App.css';
import Leaders from './components/leaders';
import CompetitorsList from './components/competitorsList';
import React from 'react';

const tierMapping = {
  'CHALLENGER': 80,
  'GRANDMASTER': 70,
  'MASTER': 60,
  'DIAMOND': 50,
  'PLATINUM': 40,
  'GOLD': 30,
  'SILVER': 20,
  'BRONZE': 10,
  'IRON': 0,
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
    const metadata = JSON.parse(process.env.REACT_APP_PLAYER_DATA || {});
    const promises = metadata.players.map(p => {
      return fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${p.ign}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`)
        .then(res => res.json())
        .then(summonerData => {
          return fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerData.id}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`)
            .then(res => res.json())
            .then(summonerData => {
              const s = summonerData.find(r => r.queueType === 'RANKED_TFT');
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
            }).catch(e => {
              console.log(e)
              return null;
            })
        }).catch((e) => {
          console.log(e)
          return null;
        })
    })
    Promise.all(promises).then((summonerData) => {    
      if (summonerData.find(s => s === null) === null) {
        this.setState({
          players: undefined
        });
        return;
      }
      const players = summonerData.map((s, index) => {
        s.pos = index+1;
        const rank = (Number(`${tierMapping[s.tier]}`) + Number(`${rankMapping[s.rank]}`)  + Number(`0.${s.lp}`)) || 0;
        const goal = (Number(`${tierMapping[s.goal]}`) + Number(`${rankMapping['IV']}`));
        s.progress = Math.min(rank / goal * 100, 100);
        return s;
      })
      players.sort((p1, p2) => {
        return p1.progress > p2.progress ? -1 : 1;
      });

      players.forEach((s, index) => {
        s.pos = index+1;
      })

      this.setState({
        players
      });
    });
  }
  

  render(){   
    const ranking = this.state.players !== undefined ? (
      <>
        <Leaders players={this.state.players.slice(0, 3)}/>
        <br/>
        <CompetitorsList players={this.state.players.slice(3, this.state.players.length)}/>
      </>
    ) : (
      <span>{'we refreshed too much :( try again later'}</span>
    );

    return (
      <div className="App">
        {ranking}
        <br />
        <br />
        <br />
        <div className="footer">
          <span>{'ping @alby if you want to be added ^-^. let me know your ign and goal rank'}</span>
        </div>
      </div>
    );
  }
}

export default App;
