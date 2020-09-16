import React from 'react';
import { withRouter } from 'react-router-dom';
import ConnectToS3BucketForm from '../components/connect-to-s3-bucket';

const ConnectToS3Bucket = ({ config, aws, onBucketConnected, ...props }) => {
  return (
    <div className="form-container">
      <ConnectToS3BucketForm
        {...{ ...props, config, aws, onBucketConnected }}
      />
    </div>
  );
};
export default withRouter(ConnectToS3Bucket);
