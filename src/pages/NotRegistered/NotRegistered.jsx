import React from 'react';

const NotRegistered = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 w-1/5 mt-8">
                <img src="/img/logo.png" alt="logo"/>
            </div>
            <div className="text-xl p-8 text-center">Приложение еще не зарегистрированно. Пожалуйста, обратитесь к администратору группы.</div>
        </div>
    );
};

NotRegistered.propTypes = {

};

export default NotRegistered;