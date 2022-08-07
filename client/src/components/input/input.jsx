import React from "react";

// CSS
import CSSModules from "react-css-modules";
import cn from "classnames";
import styles from "./input.module.scss";

const Input = ({className, value, setValue, image}) => {
    return (
        <div styleName="root" className={className}>
            <input
                type="input"
                styleName="input"
                value={value}
                onChange={event => setValue(event.target.value)}
                placeholder="Найти услугу"
                spellCheck="false"
                autoComplete="false"
            />
            {
                image && <img styleName="image" src={image} alt="find" />
            }
        </div>
    );
};

export default CSSModules(Input, styles, {
    allowMultiple: true
});
