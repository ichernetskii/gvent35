import React, {useState} from "react";
import NumberFormat from "react-number-format";

// utils
import data from "js/assets/data";

// CSS
import s from "./form-cta.module.scss";
import cn from "classnames";
import {phoneToTel, request} from "js/assets/utils";

const FormCta = ({isVisible, setVisible}) => {
    const initialSubmit = {
        text: "Заказать звонок",
        isDisabled: false
    }

    const [req, setReq] = useState({})
    const [res, setRes] = useState(null);
    const [submit, setSubmit] = useState(initialSubmit);

    const setInitialState = () => {
        setReq({});
        setRes(null);
        setSubmit(initialSubmit);
    }

    const close = () => {
        setVisible(false);
        setInitialState();
    }

    const sendHandler = async () => {
        try {
            setSubmit({ isDisabled: false, text: "Отправка …" });
            setRes({ ...res, hasError: false });

            const result = await request("/api/mail/send", "POST", { ...req, name: "Не указано" })

            setRes({ hasError: false });
            setSubmit({ isDisabled: true, text: result.message });
        } catch (e) {
            if (Array.isArray(e.errors)) {
                const _res = { hasError: true };
                e.errors.forEach(error => _res[error.param] = error.msg)
                setRes(_res);
                setSubmit({ isDisabled: false, text: initialSubmit.text });
            } else {
                setRes({ hasError: true });
                setSubmit({ isDisabled: false, text: e?.message || "Ошибка" });
            }
        }
    }

    const changeHandler = (key, value) => {
        setInitialState();
        setReq({
            ...req,
            [key]: value === "" ? undefined : value
        });
    }

    return (
        <div className={cn(s["form-cta"], {[s["form-cta_visible"]]: isVisible})} onClick={close}>
            <div className={s["form"]} onClick={e => e.stopPropagation()}>
                <div className={s["form__close"]} onClick={close}>&times;</div>
                <header className={s["form__header"]}>Оставьте свой телефон и мы с вами свяжемся</header>
                <div className={s["form__description"]}>Введите ваш телефон и наш специалист свяжемся с вами в ближайшее время</div>
                <NumberFormat
                    format="+7 (###) ###-##-##"
                    allowEmptyFormatting
                    mask="_"
                    inputMode="tel"
                    type="tel"
                    className={cn(
                        "text-control",
                        {"text-control_error": res?.phone },
                        s["form__text"]
                    )}
                    isNumericString={true}
                    onValueChange={e => changeHandler("phone", e.value )}
                />
                <input
                    className={cn(
                        "btn",
                        s["form__button"],
                        { [s["form__button_disabled"]]: submit.isDisabled }
                    )}
                    type="button"
                    disabled={submit.isDisabled}
                    value={submit.text}
                    onClick={sendHandler}
                />
                <div className={s["form__additional"]}>
                    или позвоните нам по телефону
                    <a
                        className={s["form__phone"]}
                        href={`tel:${phoneToTel(data.contact.phone)}`}
                    >
                        {data.contact.phone}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default FormCta;
