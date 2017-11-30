import React, { Component } from 'react';
import {Picker, OptionBox} from 'react-picker'
import background from './images/background.jpg'
import './App.css';
import player1 from './images/player1.png';
import player2 from './images/player2.png';
import player3 from './images/player3.png';
import bastia from './images/bastia.png';
import psg from './images/psg.png';
import dataJSON from './datas/data.json'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {playerPhoto: "", data:dataJSON, player:{'firstname':'','lastname':''}, team:{'name':""}, homeTeamScore:{'teamId':'','score':''},awayTeamScore:{'teamId':'','score':''}}
    this.handleChangePlayer = this.handleChangePlayer.bind(this);
    this.handleChangeGame = this.handleChangeGame.bind(this);
  }
  handleChangePlayer(event) {
    this.setState({value: event.target.value});
    this.state.data.medias.map((item,key) => {
      if(this.state.data.medias[key].playerId == this.state.value){
        this.state.playerPhoto = this.state.data.medias[key].path
      }
      if(this.state.data.medias[key].teamId == this.state.team.id){
        this.state.teamLogo = this.state.data.medias[key].path
      }
    })
    this.state.data.players.map((item,key) => {
      if(this.state.data.players[key].id == this.state.value){
        this.state.player = this.state.data.players[key]
      }
    })
    this.state.data.teams.map((item,key) => {
      if(this.state.data.teams[key].id == this.state.player.teamId){
        this.state.team = this.state.data.teams[key]
      }
    })
    console.log(this.state.playerPhoto);
    console.log(this.state.player);
  }

  handleChangeGame(event) {
    this.setState({valueGame: event.target.value});
    this.state.game = this.state.valueGame;
    console.log(this.state.game);
    this.state.homeTeamScore = this.state.game.homeTeamScore;
    this.state.awayTeamScore = this.state.game.awayTeamScore;

    this.state.data.medias.map((item,key) => {
      if(this.state.data.medias[key].teamId == this.state.game.awayTeamScore.teamId){
        this.state.awayTeamPhoto = this.state.data.medias[key].path
      }
      if(this.state.data.medias[key].teamId == this.state.game.homeTeamScore.teamId){
        this.state.homeTeamPhoto = this.state.data.medias[key].path
      }
    })
    this.state.data.teams.map((item,key) => {
      if(this.state.data.teams[key].id == this.state.game.homeTeamScore.teamId){
        this.state.homeTeamName = this.state.data.teams[key]
      }
      if(this.state.data.teams[key].id == this.state.game.awayTeamScore.teamId){
        this.state.awayTeamName = this.state.data.teams[key]
      }
    })
    console.log(this.state.playerPhoto);
    console.log(this.state.player);
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <img src={background} alt="background" className="background"/>
        <img src={this.state.playerPhoto} alt="playerName" className="playerName"/>
        <img src={this.state.teamLogo} alt="teamLogo" className="teamLogo"/>
        <h2>{this.state.player.firstName} {this.state.player.lastName}</h2>
        <h3>{this.state.team.name}</h3>

        <img src={this.state.homeTeamPhoto} alt="homeTeamPhoto" className="homeTeamPhoto" />
        <p className="score">{this.state.homeTeamScore.score} - {this.state.awayTeamScore.score}</p>
        <img src={this.state.awayTeamPhoto} alt="awayTeamPhoto" className="awayTeamPhoto" />

        <form onSubmit={this.handleSubmit}>
          <label>
            <select value={this.state.value} onChange={this.handleChangePlayer}>
              {this.state.data.players.map((item, key) => (
                <option className='player' value={this.state.data.players[key].id}>{this.state.data.players[key].firstName} </option>
              ))}
            </select>
          </label>
        </form>
        <form onSubmit={this.handleSubmit}>
          <label>
            <select value={this.state.value} onChange={this.handleChangeGame}>
              {this.state.data.games.map((item, key) => (
                    this.state.data.teams.map((item1,key1) => {
                      if(this.state.data.teams[key1].id == this.state.data.games[key].homeTeamScore.teamId ){
                        this.state.homeTeam = this.state.data.teams[key1].name;
                      }
                      if(this.state.data.teams[key1].id == this.state.data.games[key].awayTeamScore.teamId ){
                        this.state.awayTeam = this.state.data.teams[key1].name;
                      }
              }),
              <option className='player' value={this.state.data.games[key]}> {this.state.homeTeam} - {this.state.awayTeam} </option>
              ))}
            </select>
          </label>
        </form>
      </div>
    );
  }
}

export default App;
