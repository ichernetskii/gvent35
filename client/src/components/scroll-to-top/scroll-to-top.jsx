import React from "react";
import animateScrollTo from 'animated-scroll-to';

// CSS
import s from "./scroll-to-top.module.scss";
import cn from "classnames";

const ScrollToTop = ({scrollPosition, isVisible = true}) => {
    const onClickHandler = () => {
        animateScrollTo(0, {
            maxDuration: 2000,
            speed: 300,
        });
    }

    return (
        <div
            className={cn(s["scroll-to-top"], {[s["scroll-to-top_hidden"]]: scrollPosition < window.innerHeight || !isVisible})}
            onClick={onClickHandler}
        />
    );
}

export default ScrollToTop;
