import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenticationActions } from '../actions';
import { useDispatch } from 'react-redux';

const UserMenu = ({
  user,
  roleActivated,
  changeRoleActivated,
  clickButtonLogout,
  auth,
  roles,
}) => {
  const truncate = input => input?.length > 27 ? `${input?.substring(0, 27)}...` : input;
  const dispatch = useDispatch();

  const formatRoleMenu = role => {
    if (role === 'grandReseau') {
      return `Grand réseau - ${user.reseau}`;
    } else if (role === 'prefet') {
      return `Préfet - ${user?.departement ? 'dép ' + user?.departement : 'région ' + user?.region}`;
    } else if (role === 'hub') {
      return `Hub - ${user?.hub}`;
    } else if (role === 'structure') {
      return `Structure - ${truncate(user?.nomStructure)}`;
    }
    return role?.charAt(0).toUpperCase() + role?.slice(1).split('_')[0];
  };

  return (
    <>
      <nav className="fr-nav" role="navigation">
        <ul className="fr-nav__list">
          <li className="fr-nav__item">
            <button
              className="fr-btn fr-btn--tertiary fr-nav__btn fr-px-2w button-user-menu fr-icon-arrow-down-s-fill fr-btn--icon-right"
              aria-expanded="false"
              aria-controls="menu-774"
            >
              <i className="ri-account-circle-line ri-xl fr-mr-1w" aria-controls="menu-774"></i>
              <span className="fr-text--md fr-text--bold">{user?.name}</span>
            </button>
            <div className="fr-collapse fr-menu" id="menu-774" style={{ top: '50%' }}>
              <ul className="fr-menu__list">
                <li>
                  <p
                    className="fr-nav__link fr-text--bold"
                    href="#"
                    target="_self"
                    style={{ color: '#000091' }}
                  >
                    {formatRoleMenu(roleActivated)}
                  </p>
                </li>
                <li>
                  <Link
                    to={`${roleActivated}/informations`}
                    className="fr-nav__link"
                    {...(location.pathname.startsWith(`/${roleActivated}/informations`) ? { 'aria-current': 'page' } : {})}>
                    <i className="ri-settings-3-line ri-xl fr-mr-1w" style={{ color: '#000091' }}></i>{' '}G&eacute;rer mon profil
                  </Link>
                </li>
                {roleActivated === 'structure' && (
                  <li>
                    <Link
                      to={`${roleActivated}/ma-structure`}
                      className="fr-nav__link"
                      {...(location.pathname.startsWith(`/${roleActivated}/ma-structure`) ? { 'aria-current': 'page' } : {})}>
                      <i className="ri-home-4-line ri-xl fr-mr-1w" style={{ color: '#000091' }}></i>{' '}G&eacute;rer ma structure
                    </Link>
                  </li>
                )}
                <li>
                  {auth?.isAuthenticated ? (
                    <button
                      className="fr-nav__link button-disconnect-auth"
                      href="#"
                      onClick={clickButtonLogout}
                      target="_self"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <i className="ri-logout-box-r-line ri-xl fr-mr-1w" style={{ color: '#000091' }}></i>
                      Se d&eacute;connecter
                    </button>
                  ) : (
                    <button
                      className="fr-nav__link button-disconnect"
                      href="#"
                      onClick={clickButtonLogout}
                      target="_self"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <i className="ri-logout-box-r-line ri-xl fr-mr-1w" style={{ color: '#000091' }}></i>
                      Se d&eacute;connecter
                    </button>
                  )}
                </li>
                {roles?.length > 1 && (
                  <li>
                    <p className="fr-nav__link fr-text--bold" href="#" target="_self">
                      Mes r&ocirc;les
                    </p>
                    {roles
                    .filter(role => role !== roleActivated)
                    .map((role, i) => (
                      <button
                        className="fr-text fr-nav__link"
                        href="#"
                        target="_self"
                        style={{ boxShadow: 'none' }}
                        onClick={() => {
                          changeRoleActivated(role);
                          dispatch(authenticationActions.resetApplication());
                        }}
                        key={i}
                      >
                        {formatRoleMenu(role)}
                      </button>
                    ))}
                  </li>
                )}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

UserMenu.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
  roleActivated: PropTypes.string,
  changeRoleActivated: PropTypes.func,
  clickButtonLogout: PropTypes.func,
  auth: PropTypes.object,
  roles: PropTypes.array,
  structure: PropTypes.object,
};

export default UserMenu;
