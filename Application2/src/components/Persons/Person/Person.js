import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Person.css";
import Aux from "../../../hoc/Auxiliary";
import withClass from "../../../hoc/withClass";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
  static contextType = AuthContext;
  componentDidMount() {
    //this.inputElementRef.focus();
    //this.focus();
    console.log(this.context.authenticated); //static contextType = AuthContext; ile this.context nesnesi tanımlandı.
  }
  focus() {
    //if (this.props.position === 0)
    this.inputElementRef.current.focus();
  }
  render() {
    console.log("[Person.js] rendering...");
    return (
      /*
            <div className={classes.Person}>
                <p onClick={this.props.click}>
                    I'm {this.props.name} and I am {this.props.age} years old!
                </p>
                <p>{this.props.children}</p>
                <input
                    type='text'
                    onChange={this.props.changed}
                    value={this.props.name}
                />
            </div>
            */
      /*
            [
                <p key='k1' onClick={this.props.click}>
                    I'm {this.props.name} and I am {this.props.age} years old!
                </p>,
                <p key='k2'>{this.props.children}</p>,
                <input
                    key='k3'
                    type='text'
                    onChange={this.props.changed}
                    value={this.props.name}
                />
            ]
            */
      <Aux>
        {/** <AuthContext.Consumer>
          {context =>
            context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>
          }
        </AuthContext.Consumer> */}
        {this.context.authenticated ? (
          <p>Authenticated</p>
        ) : (
          <p>Please log in</p>
        )}
        <p key="k1" onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key="k2">{this.props.children}</p>
        <input
          key="k3"
          /*ref={inpuetEl => {
            this.inputElement = inpuetEl;
          }}*/
          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};
export default withClass(Person, classes.Person);
