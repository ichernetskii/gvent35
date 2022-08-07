import React, {useState} from "react";
import NumberFormat from "react-number-format";

// utils
import {request} from "js/assets/utils";

// CSS
import CSSModules from "react-css-modules";
import s from "./feedback.module.scss";
import cn from "classnames";

const Feedback = ({className}) => {
    const initialSubmit = {
        text: "Отправить сообщение",
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

    const sendHandler = async () => {
        try {
            setSubmit({ isDisabled: false, text: "Отправка …" });
            setRes({ ...res, hasError: false });

            const result = await request("/api/mail/send", "POST", req)

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

    const changeHandler = (e, key, value) => {
        setInitialState();
        setReq({
            ...req,
            [key]: value === "" ? undefined : value
        });
    }

    return (
        <div className={className} styleName="feedback">
            <div styleName="feedback__section">
                <input
                    type="text"
                    className={cn("text-control", {"text-control_error": res?.name })}
                    styleName="feedback__text"
                    placeholder="Имя"
                    onChange={e => changeHandler(e, "name", e.target.value )}
                />
                <input
                    type="text"
                    className={cn("text-control", {"text-control_error": res?.email })}
                    styleName="feedback__text"
                    placeholder="E-mail"
                    onChange={e => changeHandler(e, "email", e.target.value )}
                />
                <NumberFormat
                    format="+7 (###) ###-##-##"
                    allowEmptyFormatting
                    mask="_"
                    inputMode="tel"
                    type="tel"
                    className={cn("text-control", {"text-control_error": res?.phone })}
                    styleName="feedback__text"
                    isNumericString={true}
                    onValueChange={e => changeHandler(e, "phone", e.value )}
                />
            </div>
            <div styleName="feedback__section">
                <textarea
                    className={cn("text-control", {"text-control_error": res?.message })}
                    styleName="feedback__msg"
                    placeholder="Сообщение"
                    onChange={e => changeHandler(e, "message", e.target.value )}
                />
                <input
                    className="btn"
                    styleName={cn("feedback__btnSend", { "feedback__btnSend_disabled": submit.isDisabled })}
                    type="button"
                    disabled={ submit.isDisabled }
                    value={submit.text}
                    onClick={sendHandler}
                />
            </div>
        </div>
    )
};

export default CSSModules(Feedback, s, {
    allowMultiple: true
});
