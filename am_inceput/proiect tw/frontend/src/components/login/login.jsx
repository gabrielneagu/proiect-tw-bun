import React from "react";
import users from './Users';
import ReactDOM from 'react-dom';
import Navbar from '../../Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Alimente from '../../Alimente/Alimente';
import Prieteni from "../../Prieteni/Prieteni"
import AdaugaAliment from "../../Alimente/AdaugaAliment";
import AdaugaPrieten from "../../Prieteni/AdaugaPrieten";
//import loginImg from "../../login.svg";

class Login extends React.Component{
  constructor(props){
      super(props)
      this.state={
          lista: [],
          username: '',
          id:'',
          parola: '',
          registerClick: false
      }
  }

  logIn =()=>{
      return(
          ReactDOM.render(
              <React.StrictMode>
                <Router>
                  <Navbar/>
                  <Switch>
                    <Route exact path='/alimente'>
                      <Alimente id={this.state.id}/>
                    </Route>
                    <Route path="/prieteni">
              <Prieteni idPrieten={this.state.id} />
            </Route>
            <Route exact path='/adaugaAliment'>
              <AdaugaAliment idUtilizator={this.state.id}></AdaugaAliment>
            </Route>
            <Route exact path='/adaugaPrieten'>
              <AdaugaPrieten idPrieten1={this.state.id}></AdaugaPrieten>
            </Route>
                  </Switch>
                  </Router>
              </React.StrictMode>,
              
      document.getElementById('root')
          )
          
      )
      
  }

  verificare = async()=>{
      let ok=false;
      for(let user of this.state.lista){
          if(user.numeUtilizator === this.state.username && 
              user.parola === this.state.password){
                  ok=true;
              }
      }
      if(ok===true){
        let id=await users.getIdUser(this.state.username);
        this.setState({id:id})
          this.logIn();
      }
      else{
          alert("Nume de utilizator incorect sau parola incorecta!")
      }
  }

  getUtilizatori = async ()=>{
      let x = await users.getAll();
      this.setState({lista: x});
      
      //this.setState({id: id}) 
      //console.log(this.state.id);
  }

  handleChange = (evt)=>{
      this.setState({
          [evt.target.name]: evt.target.value
      })
  }

  componentDidMount(){
      this.getUtilizatori();
  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          {/* <div className="image">
            <img src={loginImg} />
          </div> */}
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" id="btnLogin" onClick={this.verificare}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
export default Login
