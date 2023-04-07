import React from 'react';
import PropTypes from 'prop-types';

const UserMenu = ({
  user,
  roleActivated,
  changeRoleActivated,
  buttonLogoutRef,
  auth,
  roles,
  structure,
}) => {
  const formatRoleMenu = role => {
    if (role === 'grandReseau') {
      return user?.reseau ? `Grand réseau - ${user.reseau}` : 'Grand réseau';
    } else if (role === 'prefet') {
      return `Préfet - ${user?.departement ? 'dép ' + user?.departement : 'région ' + user?.region}`;
    } else if (role === 'hub_coop') {
      return `Hub - ${user?.hub}`;
    } else if (role === 'structure') {
      return user?.reseau ? `Structure - ${user.reseau}` : 'Structure';
    }
    return role?.charAt(0).toUpperCase() + role?.slice(1).split('_')[0];
  };

  return (
    <>
      <nav className="fr-nav" role="navigation">
        <ul className="fr-nav__list">
          <li className="fr-nav__item">
            <button
              className="fr-btn fr-btn--tertiary fr-nav__btn fr-icon-arrow-down-s-fill fr-btn--icon-right"
              aria-expanded="false"
              aria-controls="menu-774"
            >
              <i className="ri-account-circle-line  ri-xl fr-mr-1w" aria-controls="menu-774"></i>
              <span className="fr-text--md fr-text--bold">{user?.name}</span>
            </button>
            <div className="fr-collapse fr-menu" id="menu-774" style={{ top: '50%' }}>
              <ul className="fr-menu__list" style={{ width: '251px' }}>
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
                  <button
                    className="fr-nav__link"
                    href="#"
                    target="_self"
                    style={{ display: 'flex', alignItems: 'center' }}
                    onClick={() => window.open(`/${roleActivated}/informations`)}
                  >
                    <i className="ri-settings-3-line ri-xl fr-mr-1w" style={{ color: '#000091' }}></i>{' '}
                    G&eacute;rer mon profil
                  </button>
                </li>
                {roleActivated === 'structure' && (
                  <li>
                    <button
                      className="fr-nav__link"
                      href="#"
                      target="_self"
                      style={{ display: 'flex', alignItems: 'center' }}
                      onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}
                    >
                      <i className="ri-home-4-line ri-xl fr-mr-1w" style={{ color: '#000091' }}></i>{' '}
                      G&eacute;rer ma structure
                    </button>
                  </li>
                )}
                <li>
                  {auth?.isAuthenticated ? (
                    <button
                      ref={buttonLogoutRef}
                      className="fr-nav__link button-disconnect-auth"
                      href="#"
                      target="_self"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <i className="ri-logout-box-r-line ri-xl fr-mr-1w" style={{ color: '#000091' }}></i>
                      Se d&eacute;connecter
                    </button>
                  ) : (
                    <button
                      ref={buttonLogoutRef}
                      className="fr-nav__link button-disconnect"
                      href="#"
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
                        onClick={() => changeRoleActivated(role)}
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
  buttonLogoutRef: PropTypes.object,
  auth: PropTypes.object,
  roles: PropTypes.array,
  structure: PropTypes.object,
};

export default UserMenu;
