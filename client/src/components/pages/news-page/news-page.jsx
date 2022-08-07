import React from "react";

// Components
import Pagination from "components/pagination";

// data
import data from "js/assets/data.js";
import Breadcrumbs from "components/breadcrumbs/breadcrumbs";

// CSS
import styles from "components/pages/news-page/news-page.module.scss";
import CSSModules from "react-css-modules";

const NewsPage = () => {
    return (
        <main styleName="root">
            <Breadcrumbs
                styles={styles}
                styleName="breadcrumbs"
                currentPageTitle="Новости"
            />
            <section className="content">
                <h1 styleName="page-header">Новости</h1>
            </section>
            <section className="content">
                <Pagination data={data.news} styles={styles} reverse={true} />
            </section>
        </main>
    );
};

export default CSSModules(NewsPage, styles, {
    allowMultiple: true
});

