import React from "react";

// CSS
import CSSModules from "react-css-modules";
import styles from "./table.module.scss";

const Table = ({className, data, query}) => {
    const filteredData = data.content.filter(contentRow => contentRow[0].toUpperCase().includes(query.toUpperCase()));
    if (!filteredData.length) return <div className="table__not-found">Ничего не найдено</div>

    return (
        <table
            className={className}
            styleName="root"
        >
            <thead>
                <tr styleName="header">
                    {
                        data.headers.map(item => (
                            <th key={item} styleName="cell header__cell">{ item }</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    filteredData.map(contentRow => (
                        <React.Fragment key={`${contentRow[0]}`}>
                            <tr styleName="row row_L">
                                {
                                    contentRow.map((item, idx) => (
                                        <td styleName="cell" key={idx} dangerouslySetInnerHTML={{ __html:
                                            idx === 0
                                                ? item.replaceAll(new RegExp(`(${query})`, "gi"), "<mark>$1</mark>")
                                                : (item && `от ${item} ₽`)
                                        } }>
                                        </td>
                                    ))
                                }
                            </tr>
                            <tr styleName="row row_S">
                                <td
                                    styleName="cell cell_header"
                                    colSpan={contentRow.length - 1}
                                    dangerouslySetInnerHTML={{ __html: contentRow[0].replaceAll(new RegExp(`(${query})`, "gi"), "<mark>$1</mark>") }}
                                />
                            </tr>
                            {
                                contentRow.map((item, idx) => (
                                    idx !== 0 && item && <tr styleName="row row_S" key={idx}>
                                        <td styleName="cell">{ data.headers[idx] }</td>
                                        <td
                                            styleName="cell cell_value"
                                            dangerouslySetInnerHTML={{ __html: `от ${item}&nbsp;₽` }}
                                        />
                                    </tr>
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </tbody>
        </table>
    );
};

export default CSSModules(Table, styles, {
    allowMultiple: true
});
