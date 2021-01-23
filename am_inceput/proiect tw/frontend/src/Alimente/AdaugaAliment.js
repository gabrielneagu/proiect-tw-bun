import React, { Component } from "react";
import aliments from "../Utils/AlimenteBack";
import Aliment from "./Aliment";
import './AdaugaAliment.css'

class AdaugaAliment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idUtilizator: props.idUtilizator,
      cantitate: 0,
      dataExpirare: "",
      disponibilitate: false,
      categorie: "",
      numeAliment: "",
    };
  }

  adauga = async () => {
    try {
      if(this.state.numeAliment.length>0 && this.state.cantitate>0 &&
        this.state.dataExpirare.length>0 && this.state.categorie.length>0)
        {
          aliments.addAliment({
            numeAliment: this.state.numeAliment,
            cantitate: this.state.cantitate,
            dataExpirare: this.state.dataExpirare,
            idUtilizator: this.state.idUtilizator,
            categorie: this.state.categorie,
            disponibilitate: true,
          });
          alert("Produsul a fost adaugat!");
        }
        else{
          alert('TOATE CAMPURILE SUNT OBLIGATORII!')
        }
      
      document.getElementById("idDenumire").value = "";
      document.getElementById("idCantitate").value = "";

      document.getElementById("idData").value = "";

      
    } catch (err) {}
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="formAdaugaA">
        <div className="rowAdaugaA">
          <label className="labelAdaugaA">Denumire Aliment:</label>
          <input
            type="text"
            id="idDenumire"
            className="inputAdaugaA"
            onChange={this.handleChange}
            name="numeAliment"
          ></input>
          <div className="rowAdaugaA">
            <label className="labelAdaugaA">Categorie:</label>
            <select
              className="selectAdaugaA"
              onChange={this.handleChange}
              name="categorie"
            >
              <option value="" selected disabled hidden>Choose here</option>
              <option value="Lactate">Lactate</option>
              <option value="Carne">Carne</option>
              <option value="Fructe">Fructe</option>
              <option value="Legume">Legume</option>
              <option value="Mezeluri">Mezeluri</option>
              <option value="Bauturi">Bauturi</option>
              <option value="Dulciuri">Dulciuri</option>
            </select>
          </div>
          <div className="rowAdaugaA">
            <label className="labelAdaugaA">Cantitate</label>
            <input
              type="number"
              id="idCantitate"
              onChange={this.handleChange}
              name="cantitate"
              className="inputAdaugaA"
            ></input>
          </div>
          <div className="rowAdaugaA">
            <label className="labelAdaugaA">Data expirare</label>
            <input
              type="date"
              id="idData"
              className="inputAdaugaA"
              onChange={this.handleChange}
              name="dataExpirare"
            ></input>
          </div>
          <button className="btnAdauga" onClick={this.adauga}>
            Adauga
          </button>
        </div>
      </div>
    );
  }
}
export default AdaugaAliment;
