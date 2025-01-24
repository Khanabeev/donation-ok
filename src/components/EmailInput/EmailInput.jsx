import PropTypes from 'prop-types';
import Input from "@/components/Input/Input.jsx";
import cn from "classnames";

const EmailInput = ({setEmail, error}) => {
    return (
        <div className="relative">
            <Input type="email"
                   className={cn("input w-full h-14 text-center", {
                       "border-error": error,
                   })}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Ваш email"
            />
            {error && (
                <div className="text-sm text-white bg-error absolute top-[-10px] px-1">{error}</div>)}
        </div>
    );
}
;

EmailInput.propTypes = {
    email: PropTypes.string,
    setEmail: PropTypes.func,
    error: PropTypes.string,
};

export default EmailInput;