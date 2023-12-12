import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    userInfo: '',
    userPhoto: '',
    loading: false,
  };

  componentDidMount() {
    this.recoverUserInfo();
  }

  recoverUserInfo = async () => {
    this.setState({ loading: true });
    const getInfo = await getUser();
    this.setState({
      userName: getInfo.name,
      userEmail: getInfo.email,
      userInfo: getInfo.description,
      userPhoto: getInfo.image,
      loading: false,
    });
  };

  render() {
    const { loading, userName, userEmail, userInfo, userPhoto } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <h3>Carregando...</h3>
            : (
              <main>
                <img
                  src={ userPhoto }
                  alt="imagem do usuario"
                  data-testid="profile-image"
                />
                <Link to="/profile/edit">Editar perfil</Link>
                <h3>Nome</h3>
                <p>{ userName }</p>
                <h3>Email</h3>
                <p>{ userEmail }</p>
                <h3>Descrição</h3>
                <p>{ userInfo }</p>
              </main>
            )
        }
      </div>
    );
  }
}

export default Profile;
