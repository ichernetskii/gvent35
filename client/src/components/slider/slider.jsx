import React, {useRef, useState, Fragment} from "react";

// CSS
import cn from "classnames";
import s from "./slider.module.scss";

const Slider = ({items}) => {
    // const [isMouseDown, setMouseDown] = useState(false);
    // const [initialSliderPos, setInitialSliderPos] = useState(null);
    // const [initialMousePos, setInitialMousePos] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const imgGroup = useRef();

    const changeSlide = n => {
        const step = imgGroup.current.offsetWidth;
        imgGroup.current.scrollTo({ left: step * n, behavior: "smooth" })
        setActiveSlide(n);
    }

    return (
        <div className={s["slider"]}>
            <div className={s["slider__button-group"]}>
                {
                    items.map((item, idx) => (
                        <Fragment key={item.label + "_wrapper"}>
                            <button
                                key={item.label}
                                className={cn(s["slider__button"], {[s["slider__button_active"]]: activeSlide === idx})}
                                onClick={() => changeSlide(idx)}
                            >
                                {item.label}
                            </button>
                            <img
                                key={item.label + "_image"}
                                className={s["slider__image-mobile"]}
                                src={item.path}
                                alt={item.label}
                                loading="lazy"
                                width={item.width}
                                height={item.height}
                            />
                        </Fragment>
                    ))
                }
            </div>
            {/*<div className={cn(s["slider__image-group"], {[s["slider__image-group_mouse-down"]]: isMouseDown})}*/}
            <div className={s["slider__image-wrapper"]}>
                <div className={cn(s["slider__image-group"])}
                     ref={imgGroup}
                     // onMouseDown={e => {
                     //     setMouseDown(true);
                     //     setInitialMousePos(e.pageX);
                     //     setInitialSliderPos(imgGroup.current.scrollLeft);
                     // }}
                     // onMouseMoveCapture={e => {
                     //     if (!isMouseDown) return;
                     //     e.preventDefault();
                     //     imgGroup.current.scrollTo({ left: initialSliderPos - (e.pageX - initialMousePos), behavior: "smooth" });
                     // }}
                     // onMouseUpCapture={e => {
                     //     setMouseDown(false);
                     //     const finalSliderPos = initialSliderPos - (e.pageX - initialMousePos);
                     //     const step = imgGroup.current.offsetWidth;
                     //     const n = Math.round(finalSliderPos/step);
                     //     imgGroup.current.scrollTo({ left: step * n, behavior: "smooth" })
                     // }}
                     // onMouseLeave={() => {
                     //     setMouseDown(false);
                     // }}
                >
                    {
                        items.map( item => (
                            <img
                                key={item.label}
                                className={s["slider__image"]}
                                src={item.path}
                                alt={item.label}
                                loading="lazy"
                                width={item.width}
                                height={item.height}
                            />
                        ))
                    }
                </div>
                <div className={s["slider__bar-group"]}>
                    { items.map( (item, idx) => (
                        <div
                            key={item.label}
                            className={cn(s["slider__bar"], {[s["slider__bar_active"]]: activeSlide === idx})}
                            onClick={() => { changeSlide(idx) }}
                        />
                    )) }
                </div>
            </div>
        </div>
    );
};

export default Slider;
