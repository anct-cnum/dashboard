import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/brands/logo-rf-conseiller-numerique-min.svg';
import { menuActions, authenticationActions } from '../actions';
import Menu from './Menu';

function Header() {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roles = useSelector(state => state.authentication.rolesAllowed);
  const roleActivated = useSelector(state => state.authentication.roleActivated);

  const toggleBurgerMenu = () => {
    dispatch(menuActions.toggleBurgerMenu());
  };

  const logout = () => {
    dispatch(authenticationActions.logout());
    navigate('/login');
  };

  const changeRoleActivated = e => {
    const { value } = e.target;
    dispatch(authenticationActions.changeRoleActivated(value));
    navigate('/');
  };

  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo">
                  <Link to="/" title="Tableau de bord - Conseiller num&eacute;rique France services">
                    <p className="fr-logo">
                        R&eacute;publique
                      <br />
                        Française
                    </p>
                  </Link>
                </div>
                <div className="fr-header__operator">
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
                    Tableau de bord - Conseiller num&eacute;rique France services
                  </p>
                </Link>
              </div>
            </div>
            { localStorage.getItem('user') && !location.pathname.startsWith('/login') &&
              <div className="fr-header__tools">
                <div className="fr-header__tools-links">
                  <ul className="fr-links-group">
                    {/* Affichage de la liste des rôles autorisés si l'utilisateur en possède plusieurs */}
                    {roles?.length > 1 &&
                      <li>
                        <div className="fr-select-group">
                          <select className="fr-select" id="select" name="select" value={roleActivated} onChange={changeRoleActivated}>
                            {roles?.map((role, idx) => {
                              return (<option key={idx} value={role}>{role}</option>);
                            })}
                          </select>
                        </div>
                      </li>
                    }
                    <li>
                      <button className="fr-btn fr-btn--sm fr-mr-md-2w" title="Se déconnecter" onClick={logout}>
                        D&eacute;connexion
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      { localStorage.getItem('user') && !location.pathname.startsWith('/login') &&
        <Menu />
      }
    </header>

  );
}

export default Header;
