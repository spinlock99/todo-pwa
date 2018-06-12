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

const rowStyle = {
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
}

const InstallInstructions = props =>
  <div style={{
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "5vh",
    width: "95vw",
  }}>
    <h2>Install the app to get started:</h2>
    <h3>Step 1:</h3>
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "grey",
      borderRadius: "10px",
      paddingTop: "15px",
    }}>
      <div>
        Click <ExitToApp style={{ transform: "rotate(-90deg)", height: "25px", width: "25px", marginLeft: "10px", marginBottom: "-5px" }} />
      </div>
      <h4>to open the Action Menu</h4>
    </div>
    <h3>Step 2:</h3>
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "grey",
      borderRadius: "10px",
      paddingTop: "15px",
    }}>
      <div style={rowStyle}>
        Click <AddToHomeScreen />
      </div>
      <h4>to finish installing the app.</h4>
    </div>
  </div>

const AddToHomeScreen = props =>
  <div style={{
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}>
    <div style={{
      backgroundColor: "black",
      height: "25px",
      width: "25px",
      borderRadius: "6px",
      margin: "10px",
    }}>
      <ContentAdd  style={{
        color: "white",
        height: "15px",
        width: "15px",
        marginLeft: "5px",
        marginTop: "5px"
      }} />
    </div>
    <span style={{ fontSize: "small" }}>Add to</span>
    <span style={{ fontSize: "small" }}>Home Screen</span>
  </div>
