import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';

/* eslint-disable */
import ErrorPage from '../pages/error';
/* eslint-enable */

import LayoutComponent from '../components/Layout';
import LoginComponent from '../pages/login';
import '../styles/theme.scss';

const PrivateRoute = ({ component, ...rest }) => {
  return ( // eslint-disable-line
  <Route
    {...rest} render={props => (
    true ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }, // eslint-disable-line
        }}
      />
    )
  )}
  />
);
}

class App extends React.PureComponent {
  render() {
    return (
      <HashRouter basepath="/cubejs-dashboard">
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/app/cubejs" />} />
          <Route path="/app" exact render={() => <Redirect to="/app/cubejs" />} />
          <PrivateRoute path="/app" component={LayoutComponent} />
          <Route path="/login" exact component={LoginComponent} />
          <Route path="/error" exact component={ErrorPage} />
          <Redirect from="*" to="/app/cubejs" />
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(App);
