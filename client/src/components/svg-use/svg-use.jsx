import React from "react";

const SVGUse = ({ className, viewBox, symbolId, style }) => {
    return (
        <svg className={className} viewBox={viewBox} style={style}>
            <use href={ "#" + symbolId } />
        </svg>
    );
};

export default SVGUse;
