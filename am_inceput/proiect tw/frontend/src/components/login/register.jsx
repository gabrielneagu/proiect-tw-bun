import React from "react";
import users from "./Users.js"
//import loginImg from "../../login.svg";

 class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      username:"",
      email:"",
      password:"",
      // ImagineProfil:"null",
      adresa:"",
      nrTelefon:"",
      detalii:""
    

    }
  }

  insertUser=async()=>{
    let exist=false
    let user=await users.getAll()
    for(let i of user){
      if(i.username===this.state.username){
        exist=true
      }
    }
    if(!exist){
      if(this.state.username!=='' && this.state.email!=='' && this.state.password!=='' && this.state.adresa!=='' && 
      this.state.nrTelefon !== '' && this.state.detalii !== ''){
        users.addUser({
          numeUtilizator: this.state.username,
          email: this.state.email,
          parola: this.state.password,
          detalii: this.state.detalii,
          // ImagineProfil: this.state.ImagineProfil,
          nrTelefon:this.state.nrTelefon,
          adresa:this.state.adresa,
        })
        alert("Contul a fost creat")
         window.location.reload()
      }else{
        alert('TOATE CAMPURILE SUNT OBLIGATORII!')
      }
      
    }
    else {
      alert('Alege alt nume')
    }
    
      
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
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
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
            </div>
             <div className="form-group">
              <label htmlFor="detalii">Detalii</label>
              <input type="text" name="detalii" placeholder="detalii" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="adresa">Adresa</label>
              <input type="text" name="adresa" placeholder="adresa" onChange={this.handleChange}></input>
            </div>
            <div className="form-group">
              <label htmlFor="nrTelefon">Telefon</label>
              <input type="text" name="nrTelefon" placeholder="nrTelefon" onChange={this.handleChange}></input>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.insertUser}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Register