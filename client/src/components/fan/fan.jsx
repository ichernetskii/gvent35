import React, {useCallback, useEffect, useRef, useState} from "react";

// CSS
import CSSModules from "react-css-modules";
import styles from "./fan.module.scss";
import {throttle} from "js/assets/utils";

function drawImage(ctx, image, x, y, w, h, degrees){
    ctx.save();
    ctx.translate(x+w/2, y+h/2);
    ctx.rotate(degrees*Math.PI/180.0);
    ctx.translate(-x-w/2, -y-h/2);
    ctx.drawImage(image, x, y, w, h);
    ctx.restore();
}

const Fan = ({className}) => {
    const canvasRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState(null);
    const resizeObserver = useRef(new ResizeObserver(entries => {
        setCanvasSize({
            width: entries[0].contentRect.width,
            height: entries[0].contentRect.height
        });
    }));

    // region Fan props
    const deltaTime = 0.1;                                                  // s
    const minFanSpeed = 0;                                                  // deg/s
    const maxFanSpeed = 40;                                                 // deg/s
    const frictionAcceleration = -5;                                        // deg/s*s
    const [fanAngle, setFanAngle] = useState(0);                   // deg
    const [fanSpeed, setFanSpeed] = useState(minFanSpeed);                  // deg/s
    const [fanAcceleration, setFanAcceleration] = useState(0);     // deg/s*s
    const [time, setTime] = useState(0);                           // s
    // endregion

    const imgRef = useRef(null);
    const angleRef = useRef(0);

    // window: onScrollHandler
    const onScrollHandler = useCallback(throttle(() => {
        setTime(0);
        setFanSpeed(maxFanSpeed);
        setFanAcceleration(frictionAcceleration);
    }, 500, { leading: false, trailing: false }), []);

    // Add scroll handler
    useEffect(() => {
        if (window.createImageBitmap) {
            window.addEventListener("scroll", onScrollHandler);
            canvasRef.current && resizeObserver.current.observe(canvasRef.current);
            return () => {
                window.removeEventListener("scroll", onScrollHandler);
                resizeObserver.current.disconnect();
            };
        }
    }, []);

    useEffect(() => {
        if (canvasRef.current && canvasSize && canvasSize.width) {
            let requestID;
            const img = new Image();
            img.src = require("img/fan.optimized.svg");

            img.onload = () => {
                const $canvas = canvasRef.current;
                const context = $canvas.getContext("2d");

                //fix
                const { width, height } = canvasSize;
                $canvas.style.width = width;
                $canvas.style.height = height;
                const canvasScale = window.devicePixelRatio;
                $canvas.width  = width  * canvasScale;
                $canvas.height = height * canvasScale;
                context.scale(canvasScale, canvasScale);

                context.drawImage(img, 0, 0, width, height);

                if (window.createImageBitmap) {
                    createImageBitmap(img)
                        .then(result => {
                            imgRef.current = result;

                            const animate = () => {
                                setTime(t => t + deltaTime);
                                context?.clearRect(0, 0, width, height);
                                if (context) {
                                    drawImage(context, imgRef.current, 0, 0, width, height, angleRef.current);
                                }

                                requestID = requestAnimationFrame(animate);
                            }

                            requestID = requestAnimationFrame(animate);
                        });
                } else {
                    context.drawImage(img, 0, 0, width, height);
                }
            }

            return () => {
                cancelAnimationFrame(requestID);
            }
        }
    }, [canvasSize?.width]);

    // fan js animation
    useEffect(() => {
        const currentSpeed = fanSpeed + fanAcceleration * time;
        if (currentSpeed < minFanSpeed) {
            setFanSpeed(minFanSpeed);
            setFanAcceleration(0);
            setFanAngle(a => a + minFanSpeed * deltaTime);
        } else {
            setFanAngle(a => a + fanSpeed * deltaTime + fanAcceleration * time * deltaTime);
        }
        angleRef.current = fanAngle;
    }, [time]);

    return (
        <div styleName="fan" className={className}>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default CSSModules(Fan, styles, {
    allowMultiple: true
});
