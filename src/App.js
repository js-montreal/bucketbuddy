import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import BucketViewer from './components/modules/BucketViewer';
import { connect } from './components/utils/amazon-s3-utils';
import ConnectToS3Bucket from './pages/ConnectToS3Bucket';

const persistConfiguration = ({ bucketName, ...rest }) => {
  const storage = window.localStorage;
  const configs = JSON.parse(storage.getItem('bucketConfigurations') || '{}');

  configs[bucketName] = { bucketName, ...rest };
  storage.setItem('bucketConfigurations', JSON.stringify(configs));
};

const App = () => {
  const [aws, setAws] = useState(null);
  const [config, setConfig] = useState({
    bucketName: process.env.REACT_APP_AWS_BUCKET,
    accessKeyId: process.env.REACT_APP_AWS_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRETACCESSKEY,
    selectedRegion: process.env.REACT_APP_AWS_REGION
  });
  const history = useHistory();

  useEffect(() => {
    setAws(connect(config));

    return () => {
      setAws(null);
    };
  }, [config]);

  const onBucketConnected = (newConfig) => {
    setConfig(newConfig);
    persistConfiguration(newConfig);

    // After we've updated the config, navigate to the bucket viewer
    history.push({
      pathname: '/bucket-viewer'
    });
  };

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={(props) => (
            <ConnectToS3Bucket
              {...{ ...props, config, aws, onBucketConnected }}
            />
          )}
        />
        <Route
          path="/bucket-viewer"
          component={(props) => <BucketViewer {...{ ...props, config, aws }} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
