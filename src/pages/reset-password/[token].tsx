'use client';

import PasswordInput from '@/elements/PasswordInput';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/settings';
import LogoWithDrawings from '../../assets/images/logo-with-drawing.svg';
import Image from 'next/image';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setConfirmationPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState ('');
    const [showSuccess, setShowSuccess] = useState(false);

    const params = useParams<{ token: string }>();

    useEffect(() => {
        document.title = 'Reset Password - Echo'
    }, []);

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('submit form')

        if (password !== passwordConfirmation) {
            setErrorMsg('Passwords do not match');
            return;
        }

        try {
            await axios.post(`${API_URL}/authentication/reset-password`, {
                token: params?.token,
                password,
            });
            setShowSuccess(true);
        } catch {
            setErrorMsg('Something went wrong');
        }
    };

    const openDesktopApp = () => {
        // todo - implement
    }

    if (showSuccess) {
        return (
            <div className="screen">
                <div className="content-wrapper">
                    <Image src={LogoWithDrawings} alt="Echo" />
                    <div className="info">
                        <h2 className="title">You&lsquo;re ready to go!</h2>
                        <p>Your password has been reset successfully. You can now log in with your new password.</p>
                    </div>
                    <button type="button" className="primary-btn" onClick={() => openDesktopApp()}>
                        Start chatting
                    </button>
                </div>
            </div> 
        )
    }

    return (
        <div className="screen">
            <form onSubmit={onFormSubmit} className="form-wrapper">
                <header>
                    <h2 className="title">Reset your password</h2>
                </header>

                <div className="fields">
                    <PasswordInput 
                        name="password"
                        value={password}
                        placeholder="New Password"
                        onChange={(_, value) => setPassword(value)}
                    />
                    <PasswordInput 
                        name="passwordConfirmation"
                        value={passwordConfirmation}
                        placeholder="Verify New Password"
                        onChange={(_, value) => setConfirmationPassword(value)}
                    />
                </div>

                <div className="bottom">
                    <div className="error-msg">
                        {errorMsg}
                    </div>

                    <button type="submit" className="primary-btn">
                    Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
