import React, { Component } from "react";
import classes from "./App.css";
import Persons from "../../components/Persons/Persons";
import Cockpit from "../../components/Cockpit/Cockpit";
import withClass from "../../hoc/withClass";
import Aux from "../../hoc/Auxiliary";
import AuthContext from "../../context/auth-context";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }
  state = {
    persons: [
      { id: "person1", name: "Max", age: 28 },
      { id: "person2", name: "Manu", age: 29 },
      { id: "person3", name: "Stephanie", age: 26 }
    ],
    otherState: "some other value",
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };
  //*********Component Creation Lifecycles***
  // static getDerivedStateFromProps(props, state) {
  //   console.log("[App.js] getDerivedStateFromProps", props);
  //   return state;
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      "[UPDATE App.js] getDerivedStateFromProps",
      nextProps,
      prevState
    );
    return prevState;
  }
  getSnapshotBeforeUpdate() {
    console.log("[UPDATE App.js] getSnapshotBeforeUpdate");
    //scrool position saving ...
  }
  // componentWillMount() {
  //     console.log('[App.js] componentWillMount');
  // }
  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }
  //**************************************************/

  //*******Component Update Lifecycles */
  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }
  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }
  //**************************************************/
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      //Bu şekilde yapmamızın nedeni, setState asenkron olarak çalışan bir metod. Yani başka bir yerden çağrıldığında şu anki state bilgileri değişmiş olabilir. changeCounter: this.state.changeCounter + 1 sonucunda yanlış bilgi dönebilir. prevState ile bu risk önlenmiş olur
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };
  loginHandler = () => {
    this.setState(this.setState({ authenticated: true }));
  };
  render() {
    console.log("[App.js] render");
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }
    return (
      /*
            <WithClass classes={classes.App}>
                <button
                    onClick={() => {
                        this.setState({ showCockpit: false });
                    }}
                >
                    Remove Cockpit
                </button>
                {this.state.showCockpit ? (
                    <Cockpit
                        showPersons={this.state.showPersons}
                        personsLength={this.state.persons.length}
                        clicked={this.togglePersonsHandler}
                        title={this.props.appTitle}
                    />
                ) : null}
                {persons}
            </WithClass>
            */
      <Aux>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
              title={this.props.appTitle}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
