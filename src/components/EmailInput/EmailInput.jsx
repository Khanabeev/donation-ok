import PropTypes from 'prop-types';
import Input from "@/components/Input/Input.jsx";
import cn from "classnames";


const EmailInput = ({register, errors}) => {
    return (
        <div className="relative">
            <Input type="email"
                   {...register("email")}
                   className={cn("input w-full h-14 text-center", {
                       "border-error": errors.email,
                   })}
                   placeholder="Ваш email"
            />
            {errors.email && (
                <div className="text-sm text-white bg-error absolute top-[-10px] px-1">{errors.email.message}</div>)}
        </div>
    );
};

EmailInput.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

EmailInput.displayName = 'EmailInput';

export default EmailInput;