import PropTypes from 'prop-types';

const DonationHeader = ({settings}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <div className="h-16 w-16 min-w-16 sm:min-w-fit sm:h-16 sm:w-16" style={{
                    backgroundImage: `url("${settings.generalInfo.fundLogo}")`,
                    backgroundSize: "cover"
                }}>
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