import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "./App.css";
import AppNavbar from "./components/AppNavbar";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    );
  }
}

export default App;
