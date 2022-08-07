import React from "react";
import {Link, useLocation} from "react-router-dom";

// Components
import Logo from "components/logo";

// config
import data from "js/assets/data";

// Redux
import {useDispatch, useSelector} from "react-redux";
import {getMenuExpanded, setMenuExpanded} from "@/store/store.js";

// Utils
import {phoneToTel} from "js/assets/utils";

// CSS
import cn from "classnames";
import s from "./header.module.scss";

const Header = ({items, isHidden, isOnlyMobileHidden}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isMenuExpanded = useSelector(getMenuExpanded);

    const path = location.pathname.slice(1);
    const closeMenu = () => dispatch(setMenuExpanded(false));

    return (
        <header className={cn(
            s.header,
            {
                [s["header_hidden"]]: isHidden,
                [s["header_onlyMobile-hidden"]]: isOnlyMobileHidden
            }
        )}>
            <div
                className={cn(s["hamburger"], {[s["hamburger_cross"]]: isMenuExpanded})}
                onClick={() => dispatch(setMenuExpanded(!isMenuExpanded))}
            >
                <div className={s["hamburger__line"]} />
                <div className={s["hamburger__line"]} />
                <div className={s["hamburger__line"]} />
            </div>
            <Logo classes={"logo_bgWhite"} onClickHandler={closeMenu} />
            <nav className={cn(s["navigation"], {[s["navigation_hidden"]]: !isMenuExpanded})}>
                <ul className={s.list}>
                    {
                        items.map(item =>
                            <li
                                key={item.href}
                                className={cn(s["list__item"], {[s["list__item_selected"]]: item.href === path})}
                            >
                                <Link className={s["list__link"]} to={`${item.href}`} onClick={closeMenu}>{item.label}</Link>
                            </li>)
                    }
                </ul>
            </nav>
            <div className={s.contacts}>
                <a className={s["contacts__phone"]} href={`tel:${phoneToTel(data.contact.phoneDisp)}`}>{data.contact.phoneDisp}</a>
            </div>
        </header>
    );
};

export default Header;
