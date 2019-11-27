import React, { Component } from "react";
/*
const withClass = props => (
    <div className={props.classes}>{props.children}</div>
);
*/
// const withClass = (WrappedComponent, className) => {
//     return props => (
//         <div className={className}>
//             <WrappedComponent {...props} />
//         </div>
//     );
// };
const withClass = (WrappedComponent, className) => {
  //Kullanıcı bilgileri,oturum,alışveriş bilgileri gibi genel veri çekileceği zaman state kontrolü yapabilmek için statefull component döndürülebilir.
  const WithClass = class extends Component {
    render() {
      return (
        <div className={className}>
          <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
        </div>
      );
    }
  };
  return React.forwardRef((props, ref) => {
    return <WithClass {...props} forwardedRef={ref} />;
  });
};
export default withClass;
