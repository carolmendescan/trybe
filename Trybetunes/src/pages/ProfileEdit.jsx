import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Icon from '../components/iconDefault.png';

class ProfileEdit extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    userInfo: '',
    userPhoto: '',
    imageUser: '',
    loading: false,
  };

  componentDidMount() {
    this.userInfo();
  }

  userInfo = async () => {
    const informations = await getUser();
    const { userName, userEmail, userInfo, userPhoto } = informations;
    this.setState({
      loading: false,
      userName,
      userEmail,
      userInfo,
      imageUser: userPhoto || Icon,
    });
  };

  onSubmit = async () => {
    const { userName, userEmail, userInfo, imageUser } = this.state;
    this.setState({ loading: true });
    await updateUser({ userName, userEmail, userInfo, userPhoto: imageUser });
    this.setState({ loading: false });
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    const min = 3;
    this.setState({
      [name]: value,
    });
    if (name === 'name') { // verificar name
      this.setState({
        buttonDisabled: value.length < min,
      });
    }
  };

  render() {
    const { userName,
      userEmail,
      userInfo,
      userPhoto,
      imageUser,
      loading,
      buttonDisabled } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div data-testid="page-profile-edit">
          <h1>Editar perfil</h1>
          <img
            data-testid="profile-image"
            src={ imageUser }
            alt="Foto Usuário"
          />
          {
            loading ? <h3>Carregando...</h3>
              : (
                <form>
                  <label htmlFor="edit-input-name">
                    Nome:
                    <input
                      id="edit-input-name"
                      data-testid="edit-input-name"
                      name="userName"
                      type="text"
                      value={ userName }
                      onChange={ this.onChange }
                      required
                    />
                  </label>
                  <label htmlFor="edit-input-email">
                    Email:
                    <input
                      id="edit-input-email"
                      data-testid="edit-input-email"
                      type="email"
                      name="userEmail"
                      value={ userEmail }
                      onChange={ this.onChange }
                      required
                    />
                  </label>
                  <label htmlFor="edit-input-description">
                    Descrição:
                    <textarea
                      id="edit-input-description"
                      data-testid="edit-input-description"
                      name="userInfo"
                      value={ userInfo }
                      onChange={ this.onChange }
                      required
                    />
                  </label>
                  <label htmlFor="edit-input-image">
                    Foto de Perfil:
                    <input
                      id="edit-input-image"
                      data-testid="edit-input-image"
                      type="text"
                      placeholder="image link"
                      name="userPhoto"
                      value={ userPhoto }
                      onChange={ this.onChange }
                      required
                    />
                  </label>
                  <Link to="/profile">
                    <button
                      type="submit"
                      data-testid="edit-button-save"
                      onClick={ this.onSubmit }
                      disabled={ buttonDisabled }
                    >
                      Enviar
                    </button>
                  </Link>
                </form>
              )
          }
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
