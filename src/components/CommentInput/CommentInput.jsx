import PropTypes from 'prop-types';
import Input from "@/components/Input/Input.jsx";
import cn from "classnames";
import {useEffect} from "react";


const CommentInput = ({register, errors, settings}) => {
    const commentSettings = settings.formSettings.comment;
    useEffect(() => {

    }, [settings]);
    return (
        <div className="relative">
            <Input type="text"
                   {...register("comment")}
                   className={cn("input w-full h-14 text-center", {
                       "border-error": errors.comment,
                       // "hidden": commentSettings.required === 0
                   })}
                   placeholder={commentSettings.placeholder || "Ваши пожелания"}
            />
            {errors.comment && (
                <div className="text-sm text-white bg-error absolute top-[-10px] px-1">{errors.comment.message}</div>)}
        </div>
    );
};

CommentInput.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
};

CommentInput.displayName = 'CommentInput';

export default CommentInput;