import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="page-profile-edit">  Profile Edit </h1>
      </div>
    );
  }
}

export default ProfileEdit;
