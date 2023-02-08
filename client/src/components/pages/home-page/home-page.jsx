import React, {useEffect, useRef} from "react";
import {Link} from "react-router-dom";

// Redux
import {useDispatch} from "react-redux";
import {setFirstScreenVisibility, setCtaVisible} from "@/store/store.js";

// Intersection Observer
import {useInView} from "react-intersection-observer";

// Components
import Logo from "components/logo";
import Slider from "components/slider";
import SVGUse from "components/svg-use";
import Fan from "components/fan";

// Utils
import {getPageWidth, phoneToTel} from "js/assets/utils.js";
// import Bowser from "bowser";

// data
import data from "js/assets/data.js";

// CSS
import cn from "classnames";
import s from "./home-page.module.scss";

const HomePage = ({menuItems}) => {
    // Browser engine
    // const isClientSupported = useMemo(() => {
    //     const clientData = Bowser.parse(window.navigator.userAgent);
    //     const engine = clientData?.engine?.name;
    //     const supportedEngines = ["Blink", "WebKit", "EdgeHTML"];
    //     const isEngineSupported =  supportedEngines.includes(engine);
    //
    //     const browserMajorVersion = +clientData?.browser?.version?.match(/^\d*/)[0];
    //     const browserName = clientData?.browser?.name;
    //
    //     const os = clientData.os;
    //     const osName = os?.name;
    //     const majorOsVersion = +os?.version?.match(/^\d*/)[0];
    //     const isOsSupported = !(os && osName === "iOS" && majorOsVersion < 10);
    //
    //     const browser = clientData?.browser;
    //     const isBrowserSupported = !(browser && browser?.name === "Safari" && (+browser?.version) < 10);
    //
    //     return isEngineSupported && isOsSupported;
    // }, []);

    // region Refs for schema
    const refSchemaPath = useRef(null);
    const refSchemaPathXS = useRef(null);
    // endregion

    const dispatch = useDispatch();

    // region Intersection Observer
        // First screen visibility
        const { ref: refFirstScreen, entry: entryFirstScreen } = useInView({
            threshold: [0.2],
        });
        // Schema visibility
        const { ref: refSchema, entry: entrySchema } = useInView({
            threshold: [0.2],
        });
        // Bubbles in schema visibility
        data.homePage.schemeContent.forEach(item => {
            const inView = useInView({
                threshold: [0.3],
            });

            item.ref = inView.ref;
            item.entry = inView.entry;
        });
    // endregion

    // region Effects
        // First screen header visibility (Intersection Observer)
        useEffect(() => {
            if (entryFirstScreen?.intersectionRatio !== undefined) {
                dispatch(setFirstScreenVisibility(entryFirstScreen.intersectionRatio))
            }
        }, [entryFirstScreen?.intersectionRatio]);

        //  Path in scheme (Intersection Observer)
        useEffect(() => {
            if (entrySchema?.intersectionRatio !== undefined) {
                const path = getPageWidth() > 780 ? refSchemaPath.current : refSchemaPathXS.current;
                if (entrySchema.intersectionRatio > 0.2) {
                    path.style.display = "block";
                    const length = path.getTotalLength();
                    // Clear any previous transition
                    path.style.transition = path.style.WebkitTransition = 'none';
                    // Set up the starting positions
                    path.style.strokeDasharray = length + ' ' + length;
                    path.style.strokeDashoffset = length;
                    // Trigger a layout so styles are calculated & the browser
                    // picks up the starting position before animating
                    path.getBoundingClientRect();
                    // Define our transition
                    path.style.transition = path.style.WebkitTransition =
                        'stroke-dashoffset 7s 1s linear';
                    // Go!
                    path.style.strokeDashoffset = '0';
                } else {
                    path.style.display = "none";
                }
            }
        }, [entrySchema?.intersectionRatio]);
        /* Intersection Observer */
    // endregion

    return (
        <main className={s["home-page"]}>
            <section ref={refFirstScreen} className={cn(s["section"], s["section_first-screen"])}>
                <div className={s["menu-wrapper"]}>
                    <div className={s["home-page__logo"]}>
                        <Logo classes="logo_L" />
                    </div>
                    <nav className={s.menu}>
                        <ul className={s["menu-list"]}>
                            {
                                menuItems.map(item =>
                                    <li className={s["menu-list__item"]} key={item.href}>
                                        <Link className={s["menu-list__link"]} to={`${item.href}`}>{item.label}</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </nav>
                </div>
                <div className={s["deflector-wrapper"]}>
                    <div className={s["deflector"]}>
                        <div className={s["deflector__rings"]} >
                            <div className={cn(s["deflector__ring"], s["deflector__ring_L"])} />
                            <div className={cn(s["deflector__ring"], s["deflector__ring_M"])} />
                            <div className={cn(s["deflector__ring"], s["deflector__ring_S"])} />
                        </div>
                        <div className={s["deflector__text"]}>
                            <a className={s["deflector__phone"]} href={`tel:${phoneToTel(data.contact.phoneDisp)}`}>{data.contact.phoneDisp}</a>
                            <h1 className={s["deflector__header"]}>ПРОФЕССИОНАЛЬНОЕ ОБСЛЕДОВАНИЕ И&nbsp;ЧИСТКА СИСТЕМ ВЕНТИЛЯЦИИ</h1>
                            <button className={cn("btn", s["deflector__btn"])} onClick={() => dispatch(setCtaVisible(true))} >Связаться со специалистом</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cn(s["section"], s["section_services"])}>
                <header className={cn(s["header"], s["header_services"])}>
                    <span className={s["header__text"]}>Услуги</span>
                </header>
                <div className={s["slider-wrapper"]}>
                    <Slider items={data.homePage.sliderItems} />
                </div>
                <div className={cn(s["services__fan-wrapper"])}>
                    <Fan
                        styles={s}
                        className={cn(s["services__fan"])}
                        //isFanFast={isFanFast}
                    />
                </div>
            </section>
            <section className={cn(s["section"], s["section_why"])}>
                <header className={cn(s["header"], s["header_why"])}>
                    <span className={s["header__text"]}>Почему мы?</span>
                </header>
                <div className={s["sticker-wrapper"]}>
                    {
                        data.homePage.whyContent.map((item, idx) => (
                            <div className={s["sticker"]} key={item}>
                                <div className={s["sticker__image"]}>
                                    <img className={s["sticker__ratio-width-to-height"]}
                                         src="data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'&gt;&lt;/svg&gt;" alt="" />
                                    <div className={s["sticker__ratio-content"]}>
                                        <div className={s["sticker__circles"]} />
                                        <SVGUse symbolId={`why_${idx + 1}`} className={s["sticker__svg"]} />
                                    </div>
                                </div>
                                <div className={s["sticker__text"]} dangerouslySetInnerHTML={{__html: item}} />
                            </div>
                        ))
                    }
                </div>
            </section>
            <section ref={refSchema} className={cn(s["section"], s["section_scheme"])}>
                <header className={cn(s["header"], s["header_scheme"])}>
                    <span className={s["header__text"]}>Схема работы</span>
                </header>
                <div className={s.scheme__wrapper}>
                    <div className={s.scheme}>
                        {
                            data.homePage.schemeContent.map((item, idx) => (
                                <div
                                    className={cn(s["bubble"], s[`bubble_step-${idx + 1}`], { [s[`bubble_step-${idx+1}-visible`]]: data.homePage.schemeContent[idx].entry?.intersectionRatio > 0.3 })}
                                    key={item.label}
                                    ref={item.ref}
                                >
                                    <div className={s["bubble__bg"]} />
                                    <img
                                        className={s["bubble__img"]}
                                        src={item.path}
                                        alt={item.label}
                                        title={item.label}
                                        loading="lazy"
                                    />
                                    <div className={s["bubble__label"]} dangerouslySetInnerHTML={{ __html: `${idx + 1}. ${item.label}` }} />
                                </div>
                            ))
                        }
                        <svg className={s["scheme__svg"]} viewBox="0 0 1734 1383" fill="none" preserveAspectRatio="none">
                            <defs>
                                <mask id="theMask" maskUnits="userSpaceOnUse">
                                    <path fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="14" strokeDasharray="20 35"
                                          d="M15.001 14.999C519.501 14.9993 1175 14.999 1364 14.999C1553 14.999 1718.5 146.998 1718.5 338.499C1718.5 530 1557.5 697.5 1364 697.5C1170.5 697.5 587.5 697.5 369.001 697.5C150.502 697.5 15.001 817.5 15.001 1012.5C15.001 1207.5 158.002 1367.07 369.001 1367.07C580 1367.07 1266.92 1367.07 1718.5 1367.07" />
                                </mask>
                            </defs>
                            <g mask="url(#theMask)">
                                <path ref={refSchemaPath} id="dashedPath" fill="none" stroke="#2396FF" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"
                                      d="M15.001 14.999C519.501 14.9993 1175 14.999 1364 14.999C1553 14.999 1718.5 146.998 1718.5 338.499C1718.5 530 1557.5 697.5 1364 697.5C1170.5 697.5 587.5 697.5 369.001 697.5C150.502 697.5 15.001 817.5 15.001 1012.5C15.001 1207.5 158.002 1367.07 369.001 1367.07C580 1367.07 1266.92 1367.07 1718.5 1367.07" />
                            </g>
                        </svg>
                        <svg className={cn(s["scheme__svg"], s["scheme__svg_XS"])} viewBox="0 0 830 2390" fill="none" preserveAspectRatio="none">
                            <defs>
                                <mask id="theMask-xs" maskUnits="userSpaceOnUse">
                                    <path fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="14" strokeDasharray="20 35"
                                          d="M25 24.9995C256.001 24.9999 189.362 24.9995 438.681 24.9995C688 24.9995 805 291.749 805 584.874C805 878 723.5 1206.19 427 1206.19C130.5 1206.19 25 1390.5 25 1751.35C25 2112.21 153.5 2365 436.09 2365C718.68 2365 598.23 2365 805 2365" />
                                </mask>
                            </defs>
                            <g mask="url(#theMask-xs)">
                                <path ref={refSchemaPathXS} id="dashedPath" fill="none" stroke="#2396FF" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"
                                      d="M25 24.9995C256.001 24.9999 189.362 24.9995 438.681 24.9995C688 24.9995 805 291.749 805 584.874C805 878 723.5 1206.19 427 1206.19C130.5 1206.19 25 1390.5 25 1751.35C25 2112.21 153.5 2365 436.09 2365C718.68 2365 598.23 2365 805 2365" />
                            </g>
                        </svg>
                        <Fan
                            styles={s}
                            className={cn(s["scheme__fan"], s["scheme__fan_1"])}
                        />
                        <Fan
                            styles={s}
                            className={cn(s["scheme__fan"], s["scheme__fan_2"])}
                        />
                    </div>
                </div>
            </section>
            <section className={cn(s["section"], s["section_about"])}>
                <header className={cn(s["header"], s["header_about"])}>
                    <span className={s["header__text"]}>ООО «{data.contact.name}»</span>
                </header>
                <div className={s["about"]}>
                    <div className={s["about__img-wrapper"]}>
                        <img
                            className={s["about__img"]}
                            src={require("img/home-page/about.jpg")}
                            alt={`ООО «${data.contact.name}»`}
                            loading="lazy"
                        />
                    </div>
                    <div className={s["about__text"]}>
                        Наша компания занимается профессиональным обследованием систем вентиляции и&nbsp;выполняет полный комплекс работ по&nbsp;чистке вентиляции от&nbsp;пылевых и&nbsp;жировых отложений, выполняет работы по&nbsp;удалению микробных и&nbsp;бактериальных отложений, выполняет сложные работы по&nbsp;пробивке завалов в&nbsp;каналах, видеодиагностике шахт и&nbsp;воздуховодов. Все очистные работы производятся бригадой профессиональных чистильщиков дымовых и&nbsp;вентиляционных каналов, аттестованных в&nbsp;специализированной организации и&nbsp;имеющих действующие удостоверения. Компания имеет лицензию МЧС на&nbsp;выполняемые работы.
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
