import React, { useEffect, createRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/brands/logo-rf-conseiller-numerique-min.svg';
import { menuActions, authenticationActions, structureActions } from '../actions';
import Menu from './Menu';
import { useAuth } from 'react-oidc-context';
import signOut from '../services/auth/logout';
import UserMenu from './UserMenu';

function Header() {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  const roles = useSelector(state => state.authentication?.rolesAllowed)?.filter(role => !['admin_coop', 'structure_coop', 'conseiller'].includes(role));
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const user = useSelector(state => state.authentication?.user);
  const structure = useSelector(state => state.structure.structure);
  const buttonLogoutRef = createRef();

  const toggleBurgerMenu = () => {
    dispatch(menuActions.toggleBurgerMenu());
  };

  const changeRoleActivated = role => {
    dispatch(authenticationActions.changeRoleActivated(role));
    navigate('/');
  };

  const handleClickButtonLogout = async e => {
    if (e?.srcElement?.className.includes('button-disconnect-auth')) {
      await signOut();
      await auth.signoutRedirect();
    }
    if (e?.srcElement?.className.includes('button-disconnect')) {
      await signOut();
    }
  };

  useEffect(() => {
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
      window.addEventListener('click', handleClickButtonLogout);
      return () => window.removeEventListener('click', handleClickButtonLogout);
    }
    if (buttonLogoutRef?.current) {
      buttonLogoutRef.current.addEventListener('click', handleClickButtonLogout);
      return () => buttonLogoutRef.current.removeEventListener('click', handleClickButtonLogout);
    }
  }, []);

  useEffect(() => {
    if (user?.entity?.$id) {
      dispatch(structureActions.get(user?.entity?.$id));
    }
  }, []);

  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo" style={{ paddingRight: '0.7rem', marginRight: '0' }}>
                  <Link to="/" title="Tableau de bord - Conseiller num&eacute;rique France services">
                    <p className="fr-logo">
                        R&eacute;publique
                      <br />
                        Française
                    </p>
                  </Link>
                </div>
                <div className="fr-header__operator" style={{ paddingLeft: '0' }}>
                  <img src={logo} className="fr-responsive-img" alt="Logo Conseiller num&eacute;rique" />
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
                <Link to="/" title="Tableau de bord - Conseiller num&eacute;rique France services">
                  <p className="fr-header__service-title">
                    Tableau de pilotage - Conseiller num&eacute;rique France services
                  </p>
                </Link>
              </div>
            </div>
            { localStorage.getItem('user') && !location.pathname.startsWith('/login') && !location.pathname.startsWith('/invitation') &&
            <div className="fr-header__tools" style={{ height: '57px' }}>
              <div className=" fr-header__tools-links" id="navigation-774" role="navigation" aria-label="Menu principal">
                <UserMenu user={user} roleActivated={roleActivated} roles={roles} changeRoleActivated={changeRoleActivated}
                  structure={structure} auth={auth} buttonLogoutRef={buttonLogoutRef}/>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
      { localStorage.getItem('user') && !location.pathname.startsWith('/login') && !location.pathname.startsWith('/invitation') &&
        <Menu />
      }
    </header>

  );
}

export default Header;
