import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import Loading from '../component/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profile: {},
    };
  }

  componentDidMount() {
    this.getProfileInfo();
  }

  getProfileInfo= async () => {
    this.setState({ loading: true });
    const profileInfo = await getUser();
    this.setState({ loading: false, profile: profileInfo });
    // console.log(profileInfo);
  }

  render() {
    const { profile, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        { loading
          ? <Loading />
          : (
            <div>
              <h3>Nome</h3>
              <p>{profile.name}</p>
              <h3>Email</h3>
              <p>{profile.email}</p>
              <h3>Descrição</h3>
              <p>{profile.description}</p>
              <img
                data-testid="profile-image"
                src={ profile.image }
                alt={ profile.name }
              />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
