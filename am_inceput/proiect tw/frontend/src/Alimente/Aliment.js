import React, {Component} from 'react';
import './Aliment.css'
class Aliment extends Component{
    render(props){
        return (
            <div className="aliment">
                <div className="details">
                    <div>Denumire: <span>{this.props.numeAliment}</span></div>
                    <div>Cantitate: <span>{this.props.cantitate}</span> kg</div>
                    <div>Data expiratre: <span>{this.props.dataExpirare}</span></div>
                    <div>Disponibilitate: <span>{this.props.disponibilitate}</span></div>
                    <div>Categorie: <span>{this.props.categorie}</span></div>
                </div>
            </div>
        )
    }
}

export default Aliment;