import AppBar from "material-ui/AppBar";
import ContentAdd from 'material-ui/svg-icons/content/add';
import ExitToApp from "material-ui//svg-icons/action/exit-to-app";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import React, { Component } from "react";
import db from "./db";
import reducer from "./reducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { TodoList } from "./components";
import { createStore, applyMiddleware, compose } from "redux";

export class App extends Component {
  configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

    if (module.hot) {
      module.hot.accept("./reducer", () => {
        const nextRootReducer = require("./reducer");
        store.replaceReducer(nextRootReducer);
      });
    }

    db.table("todos").toArray().then(todos => {
      todos.forEach(todo => {
        store.dispatch({
          type: "ADD_TODO",
          payload: todo
        });
      });
    });

    return store;
  }

  render() {
    return(
      <Provider store={this.configureStore()}>
        <MuiThemeProvider>
          {navigator.standalone
            ? <Paper style={{ height: "95vh" }}>
                <AppBar
                  title="Todo PWA"
                  showMenuIconButton={false}
                  zDepth={1}
                />
                <TodoList />
              </Paper>
            : <InstallInstructions />
          }
        </MuiThemeProvider>
      </Provider>
    );
  }
}

const InstallInstructions = props =>
  <div style={{ position: "absolute", top: "5vh" }}>
    <span>Install the app to get started:</span>
    <br />
    <span>Step 1: Click <ExitToApp style={{ transform: "rotate(-90deg)" }} /> to  open the Action Menu</span>
    <br />
    <span>Step 2: Click
      <div style={{ backgroundColor: "black", height: "25px", width: "25px", borderRadius: "6px" }}>
        <ContentAdd  style={{ color: "white", height: "15px", width: "15px", marginLeft: "5px", marginTop: "5px" }}/>
      </div>
      Add to
      <br />
      Home Screen
      <br />
      to finish installing the app.
    </span>
  </div>
