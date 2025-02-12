import React, {useEffect} from 'react';
import Input from "@/components/Input/Input.jsx";
import PropTypes from "prop-types";

const AcceptTerms = ({register, setValue, settings, colors}) => {
    const terms = settings.formSettings.terms;
    useEffect(() => {
        // Дефолтное значение
        setValue("is_terms_accepted", true)
    }, []);
    return (
        <div className="flex gap-1 text-xs text-base-300 place-content-center">
            <input
                {...register('is_terms_accepted')}
                type="checkbox"
                name="is_terms_accepted"
                className="accent-base-300"
            />
            <div>Принимаю <a href={terms.urlOffer} target="_blank" className="underline" style={{color:colors.primary}}>офферту</a> сервиса и <a href={terms.urlPersonalData} target="_blank" className="underline" style={{color:colors.primary}}>политику</a> персональных данных</div>
        </div>
    );
};

AcceptTerms.propTypes = {
    register: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
    colors: PropTypes.object.isRequired,
}

export default AcceptTerms;