import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Dimmer, Form, Loader, Message } from 'semantic-ui-react';
import testConnectionS3Bucket from '../utils/amazon-s3-utils';
import './ConnectToS3Bucket.scss';
import regions from './regions';

const ConnectToS3BucketForm = ({
  config: initialConfig,
  aws,
  onBucketConnected
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // If we've loaded the config from the env, this will
  // have some values set already.
  const [config, setConfig] = useState(initialConfig);

  const handleS3BucketSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await testConnectionS3Bucket(config);

      // Once we're sure we have a good connection, trigger
      // the onBucketConnected event handler (received through props)
      // which will update the application state and navigate
      // to the bucket viewer
      onBucketConnected(config);
    } catch ({ message }) {
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (e, { name, value }) => {
    setConfig((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Dimmer active={loading}>
        <Loader indeterminate>Trying to connect to your S3 Bucket</Loader>
      </Dimmer>
      <Message className="s3-message">
        <Message.Header>Connect to S3 Bucket</Message.Header>
        {error == null ? (
          <p>Enter your S3 connection credentials below</p>
        ) : (
          <p className="error-message">{error}</p>
        )}
      </Message>
      <Form
        className="s3-form"
        onSubmit={handleS3BucketSubmit}
        error={error != null}
      >
        <Form.Input
          required
          id="form-input-s3-bucket-name"
          name="bucketName"
          label="S3 Bucket Name"
          placeholder="my-really-cool-s3-bucket-name"
          value={config.bucketName}
          onChange={handleFieldChange}
        />
        <Form.Input
          required
          id="form-control-access-key-id"
          name="accessKeyId"
          label="Access Key ID"
          placeholder="12345ABCDEFG"
          value={config.accessKeyId}
          type="password"
          onChange={handleFieldChange}
        />
        <Form.Input
          required
          id="form-control-secret-access-key-id"
          name="secretAccessKey"
          label="Secret Access Key"
          placeholder="12345ABCDEFG/B123232"
          value={config.secretAccessKey}
          type="password"
          onChange={handleFieldChange}
        />
        <Form.Select
          required
          name="selectedRegion"
          value={config.selectedRegion}
          options={regions}
          label={{
            children: 'Region',
            htmlFor: 'form-select-control-region'
          }}
          placeholder="Region"
          search
          searchInput={{
            id: 'form-select-control-region'
          }}
          onChange={handleFieldChange}
        />
        <Button type="submit" primary>
          Connect
        </Button>
      </Form>
    </>
  );
};
export default withRouter(ConnectToS3BucketForm);
