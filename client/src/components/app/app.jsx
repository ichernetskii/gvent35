// React
import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";

// Redux
import {useDispatch, useSelector} from "react-redux";
import {
    getFirstScreenVisibility,
    getScrollPosition,
    setScrollPosition,
    getMenuExpanded,
    getCtaVisible,
    setCtaVisible
} from "@/store/store.js";

// Components
import Router from "components/router";
const ScrollToTop = React.lazy(() => import(/* webpackPrefetch: 100 */ "components/scroll-to-top"));
import SVGSymbols from "components/svg-symbols";
const FormCta = React.lazy(() => import(/* webpackPrefetch: 90 */ "components/form-cta"));
const Header = React.lazy(() => import( /* webpackPrefetch: 110 */ "components/header"));
const Footer = React.lazy(() => import( /* webpackPrefetch: 80 */ "components/footer"));
const RouterScrollToTop = React.lazy(() => import( /* webpackPrefetch: 70 */ "components/router-scroll-to-top"));

// data
import data from "js/assets/data.js";

// Utils
import {throttle} from "js/assets/utils.js";

// CSS
import "normalize.css";
import s from  "./app.module.scss";

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const scrollPosition = useSelector(getScrollPosition);
    const firstScreenVisibility = useSelector(getFirstScreenVisibility);
    const isMenuExpanded = useSelector(getMenuExpanded);
    const isCtaVisible = useSelector(getCtaVisible);

    // + hide header on forward scroll
    const [mobileHeaderHidden, setMobileHeaderHidden] = useState(false);
    let scrollDelta = useRef(0);
    let prevScrollPos = useRef(0);
    let countOfScrolls = useRef(0);

    const onScrollHandler = throttle(() => {
        countOfScrolls.current++;
        dispatch(setScrollPosition(window.pageYOffset));

        if (countOfScrolls.current <= 2) {
            prevScrollPos.current = pageYOffset;
            return;
        }

        if (pageYOffset > prevScrollPos.current)
            scrollDelta.current += pageYOffset - prevScrollPos.current
        else
            scrollDelta.current = 0;

        prevScrollPos.current = pageYOffset;
        if (scrollDelta.current >= 300)
            setMobileHeaderHidden(true);
        else
            setMobileHeaderHidden(false);
    }, 1000, { leading: false, trailing: true });

    document.body.style.overflow = isMenuExpanded || isCtaVisible ? "hidden" : "auto";

    useEffect(() => {
        window.addEventListener("scroll", onScrollHandler);
        return () => {
            window.removeEventListener("scroll", onScrollHandler);
        };
    }, []);

    return (
        <div className={s.app}>
            <RouterScrollToTop />
            <ScrollToTop scrollPosition={scrollPosition} isVisible={!isMenuExpanded} />
            <SVGSymbols />
            <FormCta isVisible={isCtaVisible} setVisible={visible => dispatch(setCtaVisible(visible))} />
            <Header
                items={data.menuItems}
                isHidden={location.pathname === "/" && firstScreenVisibility > 0.2}
                isOnlyMobileHidden={mobileHeaderHidden}
            />
            <Router />
            <Footer items={data.menuItems} showMap={location.pathname !== "/contact"} />
        </div>
    );
};

export default App;
