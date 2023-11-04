import { Route, Switch } from 'wouter';
import { Layout } from '../common/Layout.jsx';

export const App = () => (
  <Switch>
    <Route to="/" component={Stub} />
    <Route to="/map" component={Stub} />
    <Route to="/time" component={Stub} />
  </Switch>
);

const Stub = () => (
  <Layout>
    Current url - <span className="fw-bold text-info">{window.location.pathname}</span>
  </Layout>
);
