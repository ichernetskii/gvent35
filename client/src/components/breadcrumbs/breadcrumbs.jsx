import React, {Fragment} from "react";
import {Link} from "react-router-dom";

// CSS
import CSSModules from "react-css-modules";
import styles from "./breadcrumbs.module.scss";

const Breadcrumbs = ({path = [], currentPageTitle}) => {
    return (
        <div styleName="breadcrumbs">
            {
                [{ label: "Главная", href: "/" }, ...path].map((item) => (
                    <Fragment key={item.href}>
                        <Link styleName="breadcrumbs__item" to={ item.href }>{ item.label }</Link>
                        <div styleName="arrow">
                            <div styleName="arrow__line" />
                            <div styleName="arrow__end" />
                        </div>
                    </Fragment>
                ))
            }
            <span styleName="breadcrumbs__item breadcrumbs__item_last">{currentPageTitle}</span>
        </div>
    );
};

export default CSSModules(Breadcrumbs, styles, {
    allowMultiple: true
});
