import React from "react";
import Prieteni from "./Prieteni";
import users from "../components/login/Users";

class AdaugaPrieten extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idPrieten1: this.props.idPrieten1,
      nume: "",
    };
  }
  cautaDupaNume = async () => {
    let id = await users.getIdUser(this.state.nume);
    return id;
  };

  prieteni=async(id1,id2)=>{
    let bool=await users.checkFriendship(id1,id2);
    return bool;
  }

  AdaugaPrieten = async () => {
    try {
      let idPrieten2 = await this.cautaDupaNume();
      if(idPrieten2!=='' && this.state.idPrieten1!==idPrieten2){
        if(!await this.prieteni(this.state.idPrieten1,idPrieten2)){
          await users.addPrieten({
            idPrieten1: this.state.idPrieten1,
            idPrieten2: idPrieten2,
          });
          alert("Prietenul a fost adaugat!");
        }
        else{
          alert('Prietenul exista deja in lista!')
        }
        
      }else{
        alert('Persoana nu exista!')
      }
      
      document.getElementById("idUsername").value = "";
      document.getElementById("idCaracteristica").value = "";
      
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  render() {
    return (
      <div className="formAdaugaP">
        <div className="rowAdaugaP">
          <label className="labelAdaugaP">Nume prieten: </label>
          <input
            type="text"
            id="idUsername"
            className="inputAdaugaP"
            onChange={this.handleChange}
            name="nume"
          />
        </div>
        {/* <div className="rowAdaugaP">
          <label className="labelAdaugaP">Caracteristica prieten: </label>
          <input
            type="text"
            id="idCaracteristica"
            className="inputAdaugaP"
            onChange={this.handleChange}
            name="detalii"
          />
        </div> */}
        <button className="btnAdaugaPrieten" onClick={this.AdaugaPrieten}>
          Adauga
        </button>
        
      </div>
    );
  }
}
export default AdaugaPrieten;
