import React, {useEffect, useRef} from "react";

// Utils
import {script} from "js/assets/utils.js";

// config
import data from "js/assets/data";

// CSS
import CSSModules from "react-css-modules";
import s from "./map.module.scss";

const Map = ({ zoomPosition, geolocationPosition, ns = "ymaps", waitMs = 0 }) => {
    const mapRef = useRef(null);
    const yandexApiKey = `${process.env.YANDEX_API_KEY}`;

    useEffect(() => {
        script(`https://api-maps.yandex.ru/2.1/?apikey=${yandexApiKey}&lang=ru_RU&ns=${ns}`, waitMs)
            .then(() => {
                const ymaps = window[ns];
                ymaps.ready(() => {
                    const map = new ymaps.Map(mapRef.current, {
                        center: [59.212036, 39.912777],
                        zoom: 15,
                        controls: []
                    }, {
                        suppressMapOpenBlock: true,
                        maxZoom: 18
                    });

                    map.behaviors.disable('scrollZoom');

                    // controls
                    map.controls.add(new ymaps.control.ZoomControl({
                        options: { position: zoomPosition }
                    }));

                    map.controls.add(new ymaps.control.GeolocationControl({
                        options: { position: geolocationPosition }
                    }));

                    //map.controls.add("geolocationControl", { float: "right" });

                    // Создаём макет содержимого.
                    const iconContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                    )

                    const officePlacemark = new ymaps.Placemark(map.getCenter(), {
                        hintContent: `ООО «${data.contact.name}»`,
                        balloonContent: data.contact.address
                    }, {
                        // Опции.
                        // Необходимо указать данный тип макета.
                        iconLayout: "default#image",
                        // Своё изображение иконки метки.
                        iconImageHref: require("./images/geo-marker.png"),
                        // Размеры метки.
                        iconImageSize: [50, 80],
                        // Смещение левого верхнего угла иконки относительно
                        // её "ножки" (точки привязки).
                        iconImageOffset: [-25, -80],
                        // Смещение слоя с содержимым относительно слоя с картинкой.
                        iconContentOffset: [15, 15],
                        // Макет содержимого.
                        iconContentLayout: iconContentLayout
                    })

                    map.geoObjects.add(officePlacemark);
                });
            });
    }, []);

    return (
        <div styleName="map-container">
            <div styleName="map" ref={mapRef} />
        </div>
    );
};

export default CSSModules(Map, s, {
    allowMultiple: true
});
