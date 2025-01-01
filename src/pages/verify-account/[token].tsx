'use client';

import { API_URL } from '@/settings';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from '../../assets/images/logo.svg';
import LogoWithDrawings from '../../assets/images/logo-with-drawing.svg';
import Image from 'next/image';

export default function VerifyAccountPage() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLoader, setShowLoader] = useState(true);

    const params = useParams<{ token: string }>();

    useEffect(() => {
        requestToVerifyAccount();
    }, [params]);

    const requestToVerifyAccount = async () => {
        if (!params?.token) {
            setShowLoader(false);
            setShowSuccess(false);
            return;
        }

        try {
            await axios.get(`${API_URL}/users/verify/${params.token}`);
            setShowSuccess(true);
        } catch {
            setShowSuccess(false);
        } finally {
            setShowLoader(false);
        }
    };

    const requestNewVerificationToken = () => {
        // todo - implement
    } 

    const openDesktopApp = () => {
        // todo - implement
    }

    const renderSuccess = () => {
        return (
            <div className="content-wrapper">
                <Image src={LogoWithDrawings} alt="Echo" />
                <div className="info">
                    <h2 className="title">You&lsquo;re ready to go!</h2>
                    <p>Welcome to Echo! Your account has been created successfully and you&lsquo;re all set.</p>
                </div>
                <button type="button" className="primary-btn" onClick={() => openDesktopApp()}>
                    Start chatting
                </button>
            </div>
        )
    };

    const renderError = () => {
        return (
            <div className="content-wrapper">
                <Image src={Logo} alt="Echo" />
                <div className="info">
                    <h2 className="title">Something went wrong.</h2>
                    <p>We couldn&lsquo;t complete your sign-up process. Please try again or contact support if the issue persists.</p>
                </div>
                <button type="button" className="primary-btn" onClick={() => requestNewVerificationToken()}>
                    Retry
                </button>
            </div>
        )
    }; 

    return (
        <div className="screen">
            {showLoader ? (
                <div className="content-wrapper">
                    <div className="loader" />
                </div>
            ) : (  showSuccess ? renderSuccess() : renderError() )}
        </div>
    );
}
