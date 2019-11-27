import React, { useEffect, useRef, useContext } from "react";
import classes from "./Cockpit.css";
import AuthContext from "../../context/auth-context";

const cockpit = props => {
  const toggleButtonRef = useRef(null);
  const authContext = useContext(AuthContext);
  console.log(authContext.authenticated);
  useEffect(() => {
    console.log("[Cockpit.js] useEffect");
    //Http request...
    /*const timer = setTimeout(() => {
      alert("Saved data to cloud.");
    }, 1000);*/
    toggleButtonRef.current.click();
    return () => {
      //clearTimeout(timer);
      console.log("[Cockpit.js] clean up work in useEffect");
    };
  }, []); //Boş array geçilirse alert sayfa ilk açıldığında çalışır(ComponentdidMount). Sadece persons değiştiği zaman tetiklemek istiyorsak [props.persons] şeklinde tanımlayabiliriz.
  useEffect(() => {
    console.log("[Cockpit.js] 2nd useEffect");
    return () => {
      console.log("[Cockpit.js] clean up work in 2nd useEffect");
    };
  });
  const assignedClasses = [];
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }
  let btnClass = "";
  if (props.showPersons) {
    btnClass = classes.Red;
  }
  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      <button
        className={btnClass}
        onClick={props.clicked}
        ref={toggleButtonRef}
      >
        Toggle Persons
      </button>
      {/** <AuthContext.Consumer>
        {context => <button onClick={context.login}>Log in</button>}
      </AuthContext.Consumer>*/}
      {<button onClick={authContext.login}>Log in</button>}
    </div>
  );
};
export default React.memo(cockpit); //PureComponent ile aynı işlevi görür. Dom'da üst düzey props lar değişirse ancak o zaman render edilir.
