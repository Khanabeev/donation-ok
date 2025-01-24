import PropTypes from 'prop-types';

const DonationHeader = ({settings}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <img
                    src={settings.generalInfo.fundLogo}
                    alt={settings.generalInfo.fundName}
                    className="rounded-full w-16 h-16"
                />
                <div className="flex flex-col gap-1">
                    <div className="font-bold text-lg">Помощь&nbsp;{settings.generalInfo.fundName}</div>
                    <div>{settings.generalInfo.header}</div>
                </div>
            </div>
        </div>
    );
};

DonationHeader.propTypes = {
    settings: PropTypes.object.isRequired
};

export default DonationHeader;