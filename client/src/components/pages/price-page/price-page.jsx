import React from "react";

// Components
import Breadcrumbs from "components/breadcrumbs";
import Input from "components/input";
import Table from "components/table";

// Store
import {useDispatch, useSelector} from "react-redux";

// data
import data from "js/assets/data.js";

// CSS
import styles from "./price-page.module.scss";
import CSSModules from "react-css-modules";
import {setQueryPrice, getQueryPrice, setCtaVisible} from "@/store/store";

const PricePage = () => {
    const dispatch = useDispatch();
    const queryPrice = useSelector(getQueryPrice);

    return (
        <main className={styles.root}>
            <Breadcrumbs
                styles={styles}
                styleName="breadcrumbs"
                currentPageTitle="Услуги и цены"
            />
            <Input
                styleName="query"
                value={queryPrice}
                setValue={value => dispatch(setQueryPrice(value))}
                image={require("img/find.svg")}
            />
            <Table
                styleName="table"
                data={data.price}
                query={queryPrice}
            />
            <section className="content">
                <button className="btn" styleName="btn" onClick={() => dispatch(setCtaVisible(true))} >
                    Прочистить каналы!
                </button>
            </section>
        </main>
    );
};

export default CSSModules(PricePage, styles, {
    allowMultiple: true
});
