import React from "react";
import {Link} from "react-router-dom";

// Components
import SVGUse from "components/svg-use";
import Feedback from "components/feedback";
import Map from "components/map";
import Branding from "components/branding";

// utils
import {phoneToTel} from "js/assets/utils";

// data
import data from "js/assets/data.js";

// CSS
import CSSModules from "react-css-modules";
import s from "./footer.module.scss";

const Footer = ({items, showMap = true}) => {
    return (
        <>
            <footer styleName="footer">
                <div styleName="phone">
                    <a styleName="phone__link" href={`tel:${phoneToTel(data.contact.phoneDisp)}`}>
                        <SVGUse symbolId={`phone`} styleName="phone__svg" />
                        <span styleName="phone__number">{ data.contact.phoneDisp }</span>
                    </a>
                </div>
                <ul styleName="links">
                    {
                        items.map(item => (
                            <li styleName="links__item" key={item.label}>
                                <Link styleName="links__link" to={item.href}>{item.label}</Link>
                            </li>
                        ))
                    }
                </ul>
                <Feedback />
                { showMap && <Map
                    styles={s}
                    geolocationPosition={{ right: 20, top: 15 }}
                    zoomPosition={{ right: 20, bottom: 125 }}
                    waitMs={2000}
                    ns="ymaps"
                /> }
                <div styleName="icons">
                    <a styleName="icons__item" href={`mailto:${data.contact.email}`}>
                        <SVGUse styleName="icons__svg" symbolId="mail" />
                    </a>
                    <a styleName="icons__item" href={data.contact.vk}>
                        <SVGUse styleName="icons__svg" symbolId="vk" />
                    </a>
                </div>
            </footer>
            <Branding UTMSource={process.env.DOMAIN} styleName="branding" />
        </>
    );
};

export default CSSModules(Footer, s, {
    allowMultiple: true
});
