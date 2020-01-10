import React from 'react';
import User from '../../components/User';
const authIndexPage = props => (
  <div>
    <h1>The Auth Index Page-{props.appName}</h1>
    <User name='Max' age='28' />
    <style jsx>{`
      div {
        border: 1px solid #eee;
        box-shadow: 0 2px 3px #ccc;
        padding: 20px;
        text-align: center;
      }
    `}</style>
  </div>
);
authIndexPage.getInitialProps = props => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ appName: 'Super App(Auth)' });
    }, 1000);
  });
  return promise;
};
export default authIndexPage;
