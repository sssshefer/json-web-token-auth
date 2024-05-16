import React, {FC, useEffect, useState} from 'react';
import cl from './EmailConfirmPopup.module.css'
import CustomButton  from "../../shared/ui/CustomButton/CustomButton";
import {UserApi} from "../../shared/api/userApi";
import {useNavigate} from "react-router-dom";
import Timer from "../../entities/Timer/Timer";
import EmailIcon from "../../shared/ui/icons/EmailIcon";
import LoginButton from "../../features/LoginButton/LoginButton";
import {IResponse} from "../../shared/types/IResponse";
import {accentColor} from "../../shared/ui/styles/styles";

interface EmailConfirmPopupProps {
    email: string,
    password: string,
    setPopupIsVisible: React.Dispatch<React.SetStateAction<boolean>>

}
const EmailConfirmPopup:FC<EmailConfirmPopupProps> = ({email, password, setPopupIsVisible}) => {

    const navigate = useNavigate();
    const [showFailedLoginIcon, setShowFailedLoginIcon] = useState<boolean>(false)
    const [response, setResponse] = useState<IResponse|undefined>(undefined)

    useEffect(() => {
        if(response?.success){
            handleLogin()
        }
        if (!response?.success)
            if (!showFailedLoginIcon) {
                setShowFailedLoginIcon(true)
                timeout = setTimeout(() => setShowFailedLoginIcon(false), 800)
            }
    }, [response?.errors])

    let timeout;
    const handleLogin = async () => {
        setStartTimer(false)
        navigate('/me')
    };

    const [startTimer, setStartTimer] = useState(true)

    const handleResend = async () => {
        try {
            await UserApi.resendActivationLink(email, password)
            setStartTimer(true)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={cl.wrap} onClick={()=>setPopupIsVisible(false)}>
            <div className={cl.popupWrap} onClick={(e)=>e.stopPropagation()}>
                <button className={cl.exitButton} onClick={() => setPopupIsVisible(false)}>x</button>
                <div className={cl.titleWrap}>
                    <h3 className={cl.title}>Verify your account </h3>
                    <span className={cl.emailIcon}><EmailIcon color={accentColor}/></span>
                </div>
                <h6 className={cl.text}>Activation link has been sent to your email address </h6>
                <div className={cl.buttonsWrap}>
                    <div className={cl.loginButtonWrap}>
                        <LoginButton  email={email} password={password}
                                     setResponse={setResponse}>
                            <CustomButton>
                                Log in
                            </CustomButton>
                        </LoginButton>
                        <span className={cl.failedLoginIcon}>{showFailedLoginIcon && <h6>not verified</h6>}</span>

                    </div>
                    <div className={cl.resendButtonWrap}>
                        <span
                            className={cl.timerWrap}> {startTimer && <Timer setStart={setStartTimer} start={startTimer}
                                                                            secondsNumber={60}/>}</span>
                        <CustomButton className="accentOutline" onClick={(e) => {
                            !startTimer && handleResend()
                        }} style={startTimer ? {
                            borderColor: 'grey',
                            color: 'grey',
                            cursor: 'default'
                        } : {color: 'var(--lilac)'}}
                                              type='button'>Resend</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default EmailConfirmPopup;