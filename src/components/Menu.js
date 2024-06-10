import React, { useEffect, useState } from 'react';
import { menuActions } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import UserMenu from './UserMenu';
import PropTypes from 'prop-types';
import MenuAdmin from './menuRole/MenuAdmin';
import MenuStructure from './menuRole/MenuStructure';
import MenuPrefet from './menuRole/MenuPrefet';
import MenuGrandReseau from './menuRole/MenuGrandReseau';
import MenuHub from './menuRole/MenuHub';
import MenuCoordinateur from './menuRole/MenuCoordinateur';
import SousMenuCommun from './SousMenuCommun';
import SousMenuCoordinateur from '../views/connected/coordinateur/SousMenuCoordinateur';


function Menu(
  {
    user,
    changeRoleActivated,
    auth,
    roles,
    clickButtonLogout
  }
) {

  const dispatch = useDispatch();
  const location = useLocation();
  const { trackEvent } = useMatomo();


  const burgerMenuHidden = useSelector(state => state.menu?.hiddenBurgerMenu);
  const [activeMenu, setActiveMenu] = useState(null);
  const [changedMenu, setIsChangedMenu] = useState(false);

  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const toggleBurgerMenu = () => {
    dispatch(menuActions.toggleBurgerMenu());
  };

  //Fermeture du burger menu et fermeture des menus ouverts au changement de route
  useEffect(() => {
    if (burgerMenuHidden === false) {
      dispatch(menuActions.toggleBurgerMenu());
    }
    setActiveMenu(null);
  }, [location.pathname]);

  //Trick pour contourner la mauvaise gestion du DSFR pour les menus d&eacute;roulants
  useEffect(() => {
    if (changedMenu !== false) {
      setTimeout(() => {
        setActiveMenu(changedMenu);
        setIsChangedMenu(false);
      }, 60);
    }
  }, [changedMenu]);

  const onClickMenu = e => {
    setIsChangedMenu(e.target?.id);
  };

  return (
    <div className={`fr-header__menu fr-modal ${burgerMenuHidden ? '' : 'fr-modal--opened'}`} id="modal-870" aria-labelledby="fr-btn-menu-mobile-4">
      <div className="fr-container">
        <div className="fr-header__menu-links display-desktop"></div>
        <button className="fr-link--close fr-link" aria-controls="modal-870" onClick={toggleBurgerMenu}>Fermer</button>
        {/Android|iPhone|iPad/i.test(navigator.userAgent) &&
          <UserMenu
            user={user}
            roleActivated={roleActivated}
            roles={roles}
            changeRoleActivated={changeRoleActivated}
            auth={auth}
            clickButtonLogout={clickButtonLogout}
          />
        }
        <nav className="fr-nav fr-display--none-lg" id="navigation-869" role="navigation" aria-label="Menu principal">
          <ul className="fr-nav__list">
            {roleActivated === 'admin' &&
            <>
              <MenuAdmin onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
              <SousMenuCommun onClickMenu={onClickMenu} activeMenu={activeMenu} roleActivated={roleActivated} trackEvent={trackEvent} />
            </>
            }
            {roleActivated === 'structure' &&
            <>
              <MenuStructure onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
              <SousMenuCommun onClickMenu={onClickMenu} activeMenu={activeMenu} roleActivated={roleActivated} trackEvent={trackEvent} />
            </>
            }
            {roleActivated === 'prefet' &&
            <>
              <MenuPrefet onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
              <SousMenuCommun onClickMenu={onClickMenu} activeMenu={activeMenu} roleActivated={roleActivated} trackEvent={trackEvent} />
            </>
            }
            {roleActivated === 'grandReseau' &&
            <>
              <MenuGrandReseau onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
              <SousMenuCommun onClickMenu={onClickMenu} activeMenu={activeMenu} roleActivated={roleActivated} trackEvent={trackEvent} />
            </>
            }
            {roleActivated === 'hub' &&
            <>
              <MenuHub onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
              <SousMenuCommun onClickMenu={onClickMenu} activeMenu={activeMenu} roleActivated={roleActivated} trackEvent={trackEvent} />
            </>
            }
            {roleActivated === 'coordinateur' &&
            <>
              <MenuCoordinateur onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
              <SousMenuCoordinateur onClickMenu={onClickMenu} activeMenu={activeMenu} roleActivated={roleActivated} trackEvent={trackEvent} />
            </>
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}

Menu.propTypes = {
  user: PropTypes.object,
  changeRoleActivated: PropTypes.func,
  clickButtonLogout: PropTypes.func,
  auth: PropTypes.object,
  roles: PropTypes.array,
};

export default Menu;
