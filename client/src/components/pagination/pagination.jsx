import React, {useRef, useEffect, useState} from "react";
import animateScrollTo from "animated-scroll-to";

// utils
import {throttle} from "js/assets/utils";

// CSS
import CSSModules from "react-css-modules";
import styles from "./pagination.module.scss";
import cn from "classnames";

const Pagination = ({className, data, reverse = false }) => {
    let renderData = [...data];
    const [columns, setColumns] = useState(1);
    const [rows, setRows] = useState(1);
    // const [from, setFrom] = useState(0);
    const [page, setPage] = useState(1);
    const $root = useRef(null);
    const pagesCount = Math.ceil(data.length / (rows*columns));
    const itemsToRender = [];
    if (reverse) renderData.reverse();
    for (let i = (page-1)*rows*columns; i < page*rows*columns; i++) {
        if (renderData[i]) itemsToRender.push({ ...renderData[i], skip: false})
        else itemsToRender.push({
            skip: true,
            id: i,
            image: "",
            header: "",
            text: ""
        });
    }

    // region set columns & rows count
    const getColumns = () => +getComputedStyle($root.current).getPropertyValue("--columns");
    const getRows = () => +getComputedStyle($root.current).getPropertyValue("--rows");
    const onResizeHandler = throttle(() => {
        setColumns(getColumns());
        setRows(getRows());
    }, 200, { leading: true, trailing: true });
    // onLoad
    useEffect(() => {
        setColumns(getColumns());
        setRows(getRows());
    }, []);
    // onResize
    useEffect(() => {
        window.addEventListener("resize", onResizeHandler);
        return () => {
            window.removeEventListener("resize", onResizeHandler);
        };
    }, []);
    // endregion

    const gotoPage = n => {
        if (n < 1 || n > pagesCount) return;
        setPage(n);
        animateScrollTo(0, {
            maxDuration: 2000,
            speed: 300,
        });
    }

    return (
        <div ref={$root} className={className} styleName="pagination">
            {
                itemsToRender.map((item, idx) => {
                    const order = n => ({ order: ~~(idx/columns)*10 + n });

                    return (
                        <React.Fragment key={item.id}>
                            <div
                                styleName="image-wrapper"
                                style={order(0)}
                            >
                                <div styleName={cn("padding-hack", { "padding-hack_skip": item.skip })}>
                                    { item.image && <img styleName="image" src={item.image} alt={item.header} loading="lazy" /> }
                                </div>
                            </div>
                            <div
                                styleName={cn("header", { "header_skip": item.skip })}
                                style={order(1)}
                            >
                                { item.header }
                            </div>
                            <div
                                styleName={cn("text", { "text_skip": item.skip })}
                                dangerouslySetInnerHTML={{ __html: item.text }}
                                style={order(2)}
                            />
                        </React.Fragment>
                    )
                })
            }
            <div styleName={cn("controls", { "controls_hidden": pagesCount <= 1 })} style={{ order: 10*Math.ceil(rows) }}>
                <div styleName="controls__arrow controls__arrow_left" onClick={() => { gotoPage(page - 1) }} />
                {
                    Array
                        .from({ length: pagesCount}, (_, idx) => idx)
                        .map((item, idx) => (
                            <div
                                key={item}
                                styleName={cn("controls__dots", { "controls__dots_active": page === idx + 1 })}
                                onClick={() => { gotoPage(idx + 1) }}
                            />
                        ))
                }
                <div styleName="controls__arrow controls__arrow_right" onClick={() => { gotoPage(page + 1) }} />
            </div>
        </div>
    );
};

export default CSSModules(Pagination, styles, {
    allowMultiple: true
});
