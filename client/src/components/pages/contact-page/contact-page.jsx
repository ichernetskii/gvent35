import React, {useEffect} from "react";

// components
import Breadcrumbs from "components/breadcrumbs/breadcrumbs";
import Map from "components/map";
import Feedback from "components/feedback";
import Fan from "components/fan";

// utils
import {phoneToTel} from "js/assets/utils";

// data
import data from "js/assets/data.js";

// CSS
import s from "./contact-page.module.scss";
import CSSModules from "react-css-modules";

// Lightbox
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";

const ContactPage = () => {
    return (
        <main styleName="root">
            <Breadcrumbs
                styles={s}
                currentPageTitle="Контакты"
            />
            <section className="content">
                <h1 styleName="header">Контакты</h1>
            </section>
            <section className="content">
                <div styleName="phone">
                    <a styleName="phone__link" href={`tel:${phoneToTel(data.contact.phoneDisp)}`}>{ data.contact.phoneDisp }</a>
                </div>
            </section>
            <section className="content" styleName="map-and-schedule">
                <Map
                    styles={s}
                    geolocationPosition={{ left: 20, top: 15 }}
                    zoomPosition={{ left: 20, bottom: 125 }}
                    ns="ymaps-contact-page"
                />
                <div styleName="schedule">
                    <div>
                        <time
                            dateTime="Mo-Fr 09:00-18:30"
                            itemProp="openingHours"
                            styleName="schedule__open"
                        >
                            <div><b>Понедельник - Пятница</b></div>
                            <div>9:00 - 18:30</div>
                        </time>
                        <div>
                            <div><b>Суббота, Воскресенье</b></div>
                            <div>выходной</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <h1 styleName="header header-request">Заявка</h1>
            </section>
            <section className="content" styleName="feedback-and-fan">
                <div styleName="feedback-wrapper">
                    <div styleName="feedback-header">
                        <p>Оставьте своё сообщение в форме указанной ниже.</p>
                        <p>Мы ответим Вам в ближайшее время.</p>
                    </div>
                    <Feedback styles={s} />
                </div>
                <div styleName="fan-wrapper">
                    <Fan styles={s} />
                </div>
            </section>
            <section className="content" styleName="info">
                <div styleName="info__block">
                    <div styleName="info__text">
                        <header>Реквизиты</header>
                        <p>ПАО «Сбербанк», г.Вологда</p>
                        <p>БИК 041909644</p>
                        <p>К/с: 30101810900000000644</p>
                        <p>Р/с: 40702810112000010629</p>
                        <p>ИНН/КПП: 3528245220/352501001</p>
                        <p>ОГРН: 1163525055561</p>
                    </div>
                </div>
                <div styleName="info__block">
                    <div styleName="info__text">
                        <header>Лицензия</header>
                        <p>№35-Б/00130 от 03.06.2016г.</p>
                        <p>на осуществление деятельности по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности зданий и</p>
                        <LightgalleryProvider galleryClassName="license-lightgallery">
                            <div styleName="license">
                                {
                                    data.license.map((photo, idx) => (
                                        <div styleName="license__item" key={photo.title}>
                                            <LightgalleryItem group={"license"} src={photo.image}>
                                                <img styleName="license__img" src={photo.image} alt={photo.title} />
                                            </LightgalleryItem>
                                        </div>
                                    ))
                                }
                            </div>
                        </LightgalleryProvider>
                    </div>
                </div>
                <div styleName="info__block">
                    <div styleName="info__text">
                        <header>Юридический адрес</header>
                        <p dangerouslySetInnerHTML={{ __html: data.contact.address }}/>
                    </div>
                    <div styleName="info__text">
                        <header>Фактический адрес</header>
                        <p dangerouslySetInnerHTML={{ __html: data.contact.addressFact }}/>
                    </div>
                    <div styleName="info__text">
                        <header>Почта</header>
                        <p><a href={`mailto:${data.contact.email}`}>{data.contact.email}</a></p>
                    </div>
                </div>
                <div styleName="info__block">
                    <div styleName="info__text">
                        <header>Генеральный директор</header>
                        <p>{data.contact.ceo}</p>
                    </div>
                    <div styleName="info__text">
                        <header>Диспетчер</header>
                        <p>Вологда: <a href={`tel:${phoneToTel(data.contact.phoneDisp)}`}>{data.contact.phoneDisp}</a></p>
                    </div>
                    <div styleName="info__text">
                        <header>Контактный телефон</header>
                        <p><a href={`tel:${phoneToTel(data.contact.phone)}`}>{data.contact.phone}</a></p>
                        <p>Валерий Алексеевич</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CSSModules(ContactPage, s, {
    allowMultiple: true
});
