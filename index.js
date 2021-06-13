//Higher Order Comment -  A component(HOC) renders another component

import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h3>This is Info: {props.info}</h3>
  </div>
);

const withAdminInfo = WrappedComponent => {
  // this is normal function
  return (
    props // returning a HOC
  ) => (
    <div>
      <h4>Inside withAdmin Info component</h4>
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please login to wiew the Info </p>
      )}
    </div>
  );
};

const AdminInfo = withAdminInfo(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(
//   <AdminInfo info="this is details" />,
//   document.getElementById('app')
// );
ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="this is details" />,
  document.getElementById('app')
);
