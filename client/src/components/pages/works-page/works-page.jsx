import React from "react";

// Components
import Breadcrumbs from "components/breadcrumbs";
import Fan from "components/fan/fan";

// data
import data from "js/assets/data.js";

// Store
import {setCtaVisible} from "@/store/store";
import {useDispatch} from "react-redux";

// CSS
import styles from "components/pages/works-page/works-page.module.scss";
import CSSModules from "react-css-modules";

const WorksPage = () => {
    const dispatch = useDispatch();
    const itemsToDisplay = data.worksPage.works.map(
        (_, idx, arr) => arr[arr.length - idx - 1]
    );

    return (
        <main className={styles.root}>
            <Breadcrumbs
                styles={styles}
                styleName="breadcrumbs"
                currentPageTitle="О нас"
            />
            <section className="content">
                <h1 styleName="header">Наши работы</h1>
            </section>
            <section styleName="work-wrapper" className="content">
                {
                    itemsToDisplay.map((work, idx) => (
                        <div styleName="work" key={`${work.label}:${idx}`}>
                            <div styleName="work__content">
                                <img styleName="work__image" src={work.path} alt={work.label} loading="lazy" />
                                <div styleName="work__label">{ work.label }</div>
                            </div>
                        </div>
                    ))
                }
            </section>
            <section className={styles["work-fan"]}>
                <Fan styles={styles} />
            </section>
            <section className="content">
                <button className="btn" styleName="btn" onClick={() => dispatch(setCtaVisible(true))} >
                    Прочистить каналы!
                </button>
            </section>
        </main>
    );
};

export default CSSModules(WorksPage, styles, {
    allowMultiple: true
});
