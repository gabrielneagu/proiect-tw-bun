import { EventEmitter } from "fbemitter";

const server = "http://localhost:8000";

class Users {
  constructor() {
    this.data = [];
    this.emitter = new EventEmitter();
  }

  async getAll() {
    try {
      const resp = await fetch("http://localhost:8000/api/utilizatori");
      const data = await resp.json();
      return data;
    } catch (err) {
      console.warn(err);
      this.emitter.emit("Get_Users_error");
    }
  }
  async addPrieten(prietenie) {
    try {
      await fetch(`${server}/api/prieteni`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prietenie),
      });
    } catch (err) {
      console.warn(err);
      this.emitter.emit("Add_Prieteni_error");
    }
  }

  async getPrieteni(id) {
    try {
      const response = await fetch(`${server}/api/prieteni/${id}`);
      const data = await response.json();
      let result = [];
      for (let i of data) {
        if (i.idPrieten2 === id) {
          result.push(i);
        }
      }
      this.data = result;
      return this.data;
    } catch (err) {
      console.warn(err);
      this.emitter.emit("Get_Prieteni_Error");
    }
  }

  async getIdUser(nume) {
    try {
      const response = await fetch(`${server}/api/utilizatori`);
      const data = await response.json();
      let detalii = [];
      for (let x of data) {
        if (x.numeUtilizator === nume) {
          return x.idUtilizator;
        }
      }

      return "";
    } catch (err) {
      console.warn(err);
      this.emitter.emit("Get_ID_Error");
    }
  }

  async getUserName(id) {
    try {
      const response = await fetch(`${server}/api/utilizatori`);
      const data = await response.json();
      let detalii = [];
      for (let x of data) {
        if (x.idUtilizator === id) {
          return x.numeUtilizator;
        }
      }

      return "";
    } catch (err) {
      console.warn(err);
      this.emitter.emit("Get_UserName_Error");
    }
  }

  async checkFriendship(id1,id2){
    try{
      const response = await fetch(`${server}/api/prieteni/${id1}`);
      const data = await response.json();
      for(let i of data){
        if(i.idPrieten1===id2){
          return true;
        }
      }
      return false;
    }
    catch(err){
      console.warn(err);
      this.emitter.emit("Check_Friendship_Error");
    }
  }

  async getDetalii(id) {
    try {
      const response = await fetch(`${server}/api/utilizatori`);
      const data = await response.json();
      let detalii = [];
      for (let x of data) {
        if (x.idUtilizator === id) {
          return [x.numeUtilizator, x.detalii,x.idUtilizator];
        }
      }

      return "";
    } catch (err) {
      console.warn(err);
      this.emitter.emit("Get_Detalii_Error");
    }
  }

  async addUser(user) {
    try {
      await fetch(`${server}/api/utilizatori`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    } catch (err) {
      console.warn(err);
      this.emitter.emit("ADD_USER_ERROR");
    }
  }
}
const users = new Users();
export default users;
