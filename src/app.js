import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import db from "./db";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import AppBar from "material-ui/AppBar";
import { TodoList } from "./components";

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
            : <span style={{ position: "absolute", bottom: "5vh" }}>install the app to get started</span>
          }
        </MuiThemeProvider>
      </Provider>
    );
  }
}
