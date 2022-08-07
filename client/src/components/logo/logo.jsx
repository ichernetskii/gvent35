import React from "react";
import {Link} from "react-router-dom";

// Components
import SVGUse from "components/svg-use";

// Utils
import {buildClasses} from "js/assets/utils.js";

// CSS
import s from "./logo.module.scss";

const Logo = ({classes, onClickHandler}) => {
    return (
        <Link className={buildClasses(s, "logo", classes)} to="/" onClick={onClickHandler}>
            <SVGUse className={s["logo__svg"]} viewBox="0 0 367 335" symbolId="logo" />
            <div className={s["logo__text"]} >
                <div className={s["logo__line-1"]}>Жилпром</div>
                <div className={s["logo__line-2"]}>Вентиляция</div>
            </div>
        </Link>
    );
};

export default Logo;
