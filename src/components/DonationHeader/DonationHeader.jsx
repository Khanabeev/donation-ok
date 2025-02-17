import PropTypes from 'prop-types';

const DonationHeader = ({settings}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <div className="max-w-24 h-full relative top-0">
                    <img
                        src={settings.generalInfo.fundLogo}
                        alt={settings.generalInfo.fundName}
                        className="rounded-full object-cover w-full h-full align-middle"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="font-bold text-lg">Помощь&nbsp;{settings.generalInfo.fundName}</div>
                    <div>Помощь некоммерческой организации</div>
                </div>
            </div>
            <div>{settings.generalInfo.header}</div>
        </div>
    );
};

DonationHeader.propTypes = {
    settings: PropTypes.object.isRequired
};

export default DonationHeader;