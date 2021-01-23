import React from "react";
import aliments from "../Utils/AlimenteBack";
import Aliment from "./Aliment";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdaugaAliment from "./AdaugaAliment";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";
import './Alimente.css'

class Alimente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      id: props.id,
    };
  }

  getAllLactate = async () => {
    let x = await aliments.getAllCateg("Lactate", this.state.id)
    this.setState({lista: x})
    this.notificare()
}

getAllCarne = async () => {
    let x = await aliments.getAllCateg("Carne", this.state.id)
    this.setState({lista: x})
    this.notificare()
}

getAllFructe = async () => {
    let x = await aliments.getAllCateg("Fructe", this.state.id)
    this.setState({lista: x})
    this.notificare()
}

getAllLegume = async () => {
    let x = await aliments.getAllCateg("Legume", this.state.id)
    this.setState({lista: x})
    this.notificare()
}

getAllMezeluri = async () => {
    let x = await aliments.getAllCateg("Mezeluri", this.state.id)
    this.setState({lista: x})
    this.notificare()
}

getAllBauturi = async () => {
    let x = await aliments.getAllCateg("Bauturi", this.state.id)
    this.setState({lista: x})
    this.notificare()
}

getAllDulciuri = async () => {
    let x = await aliments.getAllCateg("Dulciuri", this.state.id)
    this.setState({lista: x})
    this.notificare()
}

  getAll = async () => {
    let x = await aliments.getAlimenteByUsers(this.state.id);
    this.setState({ lista: x });
    this.notificare();
  };
  changeDisponibil = async (id) => {
    await aliments.changeDisp(id);
  };

  componentDidMount(){
    //this.getAll();
  }

  adaugaAliment = () => {
    return ReactDOM.render(
      <React.StrictMode>
        <Router exact path="/alimente">
          <AdaugaAliment idUtilizator={this.state.id} />
        </Router>
      </React.StrictMode>,
      document.getElementById("root")
    );
  };

  notificare() {
    this.state.lista.map((aliment) => {
      const {
        idAliment,
        categorie,
        cantitate,
        numeAliment,
        dataExpirare,
        disponibilitate,
      } = aliment;

      let newDate = new Date(Date.now());
      let nrZileRamase =
        (new Date(aliment.dataExpirare).getTime() - newDate.getTime()) /
        (1000 * 3600 * 24);

      if (nrZileRamase <= 2 && nrZileRamase >= 0) {
        addNotification({
          title: "Atentionare",
          subtitle: "Data expirare",
          message: "Alimentul " + aliment.numeAliment + " va expira in curand!",
          theme: "darkblue",
          native: true,
        });
      } else if (nrZileRamase < 0) {
        addNotification({
          title: "Atentionare",
          subtitle: "Data expirare",
          message: "Alimentul " + aliment.numeAliment + " a expirat!",
          theme: "darkblue",
          native: true,
        });
      }
    });
  }

  sterge = async (id) => {
    await aliments.deleteAliment(id);
    alert("Alimentul a fost sters!");
  };

  render() {
    return (
      <div className="Content">
        <div className="buttons">
            <button type="button" value="Lactate" className="unButon" onClick={this.getAllLactate}><input type="image" src="Media\lactate.png" width="300" height="100"/></button>
            <button type="button" value="Carne" className="unButon" onClick={this.getAllCarne}><input type="image" src="Media/carne.png" width="300" height="100" /></button>
            <button type="button" value="Fructe" className="unButon" onClick={this.getAllFructe}><input type="image" src="Media/fructe.png" width="300" height="100" /></button>
            <button type="button" value="Legume" className="unButon" onClick={this.getAllLegume}><input type="image" src="Media/legume.png" width="300" height="100" /></button>
            <button type="button" value="Mezeluri" className="unButon" onClick={this.getAllMezeluri}><input type="image" src="Media/mezeluri.png" width="300" height="100" /></button>
            <button type="button" value="Bauturi" className="unButon" onClick={this.getAllBauturi}><input type="image" src="Media/bauturi.png" width="300" height="100" /></button>
            <button type="button" value="Dulciuri" className="unButon" onClick={this.getAllDulciuri}><input type="image" src="Media/dulciuri.png" width="300" height="100" /></button>
            </div>
        <div className="mapare">
          {this.state.lista.map((aliment) => {
            const {
              idAliment,
              denumire,
              cantitate,
              dataExpirare,
              disponibilitate,
              categorie,
            } = aliment;
            return (
              <div className="aliment">

                <Aliment
                  numeAliment={aliment.numeAliment}
                  cantitate={aliment.cantitate}
                  dataExpirare={aliment.dataExpirare}
                  disponibilitate={aliment.disponibilitate.toString()}
                  categorie={aliment.categorie}
                />
                <input
                  type="button"
                  id={aliment.idAliment}
                  className="dispClass"
                  onClick={() => this.changeDisponibil(aliment.idAliment)}
                  value="Schimba disponibilitatea"
                />
                <input
                  type="button"
                  className="dispClass"
                  onClick={() => this.sterge(aliment.idAliment)}
                  value="Sterge"
                />
              </div>

              

            );
          })}
        </div>
      </div>
    );
  }
}
export default Alimente;
