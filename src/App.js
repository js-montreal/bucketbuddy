import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import BucketViewer from './components/modules/BucketViewer/index';
import ConnectToS3Bucket from './pages/ConnectToS3Bucket';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ConnectToS3Bucket} />
        <Route path="/bucket-viewer" component={BucketViewer} />
      </Switch>
    </Router>
  );
}

export default App;
