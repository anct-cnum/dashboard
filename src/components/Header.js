import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/brands/logo-conseiller-numerique-min.svg';
import { menuActions, authenticationActions } from '../actions';
import Menu from './Menu';
import UserMenu from './UserMenu';
import Spinner from './Spinner';

function Header() {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roles = useSelector(state => state.authentication?.rolesAllowed)?.filter(role => !['admin_coop', 'structure_coop', 'conseiller'].includes(role));
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const user = useSelector(state => state.authentication?.user);
  const isLoggingOut = useSelector(state => state.authentication?.isLoggingOut);

  const clickButtonLogout = () => {
    try {
      dispatch(authenticationActions.logout());
      navigate('/login');
    } catch (error) {
      navigate('/login');
    }
  };

  const toggleBurgerMenu = () => {
    dispatch(menuActions.toggleBurgerMenu());
  };

  const changeRoleActivated = role => {
    dispatch(authenticationActions.changeRoleActivated(role));
    navigate('/');
  };

  return (
    <>
      <Spinner loading={isLoggingOut} />
      <header role="banner" className="fr-header">
        <div className="fr-header__body">
          <div className="fr-container">
            <div className="fr-header__body-row">
              <div className="fr-header__brand fr-enlarge-link">
                <div className="fr-header__brand-top">
                  <div className="fr-header__logo" style={{ paddingRight: '0', marginRight: '0' }}>
                    <Link to="/" title="Tableau de bord - Conseiller num&eacute;rique">
                      <p className="fr-logo">
                      R&eacute;publique
                        <br />
                      Française
                      </p>
                    </Link>
                  </div>
                  <div className="fr-header__operator" style={{ paddingLeft: '24px' }}>
                    <img src={logo} className="fr-responsive-img" style={{ height: '70px' }} alt="Logo Conseiller num&eacute;rique" />
                  </div>
                  <div className="fr-header__navbar">
                    <button
                      className="fr-btn--menu fr-btn"
                      data-fr-opened="false"
                      aria-controls="modal-870"
                      aria-haspopup="menu"
                      title="Menu"
                      id="fr-btn-menu-mobile-4"
                      onClick={toggleBurgerMenu}>
                    Menu
                    </button>
                  </div>
                </div>
                <div className="fr-header__service">
                  <Link to="/" title="Tableau de bord - Conseiller num&eacute;rique">
                    <p className="fr-header__service-title">
                    Tableau de pilotage - Conseiller num&eacute;rique
                    </p>
                  </Link>
                </div>
              </div>
              {!/Android|iPhone|iPad/i.test(navigator.userAgent) &&
              <>
                {localStorage.getItem('user') && localStorage.getItem('user') !== '{}' &&
                  !location.pathname.startsWith('/login') && !location.pathname.startsWith('/invitation') &&
                  <div className="fr-header__tools" style={{ height: '57px' }}>
                    <div className="fr-header__tools-links" id="navigation-774" role="navigation" aria-label="Compte utilisateur">
                      <UserMenu user={user} roleActivated={roleActivated} roles={roles} changeRoleActivated={changeRoleActivated}
                        clickButtonLogout={clickButtonLogout} />
                    </div>
                  </div>
                }
              </>
              }
            </div>
          </div>
        </div>
        {localStorage.getItem('user') && localStorage.getItem('user') !== '{}' &&
        !location.pathname.startsWith('/login') && !location.pathname.startsWith('/invitation') &&
        <Menu
          user={user}
          roleActivated={roleActivated}
          roles={roles}
          changeRoleActivated={changeRoleActivated}
          clickButtonLogout={clickButtonLogout}
        />
        }
      </header>
    </>
  );
}

export default Header;
