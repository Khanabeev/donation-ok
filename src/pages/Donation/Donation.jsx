import React, {useState} from "react";
import {callApi} from "@/core/okSdk.js";
import HeaderPanel from "@/components/HeaderPanel/HeaderPanel.jsx";
import {BiDonateHeart} from "react-icons/bi";
import ContentPanel from "@/components/ContentPanel/ContentPanel.jsx";
import AmountSelector from "@/components/AmountSelector/AmountSelector.jsx";
import Button from "@/components/Button/Button.jsx";
import Input from "@/components/Input/Input.jsx";
import PaymentMethodSelector from "@/components/PaymentMethodSelector/PaymentMethodSelector.jsx";
import {FiCheckSquare, FiSquare} from "react-icons/fi";
import Popover from "@/components/Popover/Popover.jsx";
import {GoQuestion} from "react-icons/go";

const Donation = ({groupId}) => {
    const [groupName, setGroupName] = useState("");
    const [amounts, setAmounts] = useState([300, 500, 1000, 2000, 3000, 4000]);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [minAmount, setMinAmount] = useState(0);
    const [isRecurrentPayment, setIsRecurrentPayment] = useState(true);
    const [email, setEmail] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([
        {
            payTypes: ["visa", "master", "mir"],
            name: "Банковские карты",
            slug: "bank_card"
        },
        {
            payTypes: ["mir"],
            name: "Mir Pay",
            slug: "mir_pay"
        },
        {
            payTypes: ["spay"],
            name: "SberPay",
            slug: "spay"
        },
    ]);

    const toggleRecurrent = () => {
        setIsRecurrentPayment(prevState => !prevState);
    }

    const handleDonate = (amount) => {
        alert(`Вы пожертвовали ${amount} рублей!`);
    };

    console.log(selectedAmount, selectedPaymentMethod);

    const gid = '70000033151402';
    callApi('group.getInfo', {uids: [gid], fields: ['name']})
        .then((res) => {
            setGroupName(res[0].name);
        })

    return (
        <>
            <HeaderPanel>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <BiDonateHeart className="text-6xl"/>
                        <div className="flex flex-col gap-1">
                            <div className="font-bold text-lg">Помощь&nbsp;{groupName}</div>
                            <div>Помощь некоммерческой организации</div>
                        </div>
                    </div>
                </div>
            </HeaderPanel>
            <ContentPanel>
                <div className="flex flex-col gap-4">
                    <p className="text-lg text-base-300">Сумма пожертвования</p>
                    <AmountSelector amounts={amounts} onChange={setSelectedAmount}/>
                    <Input type="email" className="input w-full h-14 text-center" placeholder="Ваш email"/>

                    <PaymentMethodSelector methods={paymentMethods} onChange={setSelectedPaymentMethod}/>
                    <div>
                        <div className="flex items-center gap-2 cursor-pointer text-base-300 transition duration-300"
                             onClick={() => toggleRecurrent()}>
                            <div className="text-4xl">{isRecurrentPayment ? (
                                <FiCheckSquare className="text-primary"/>
                            ) : <FiSquare className="text-base-200"/>}
                            </div>
                            <span>Повторяющийся платеж</span>

                            <div>
                                <Popover trigger={<GoQuestion className='text-xl'/>}
                                         content="Для управления периодическими пожертвованиями перейдите по ссылке в email"/>
                            </div>

                        </div>

                        <p className="text-xs text-base-300">Наша работа возможна благодаря вашей помощи.
                            Если вы можете помогать нам регулярно, мы сможем сделать еще больше.</p>
                    </div>

                    <Button className="rounded-lg" size="xl" variant="secondary" disabled={isButtonDisabled}>Помочь</Button>
                </div>

            </ContentPanel>
        </>
    );
};

export default Donation;