'use client';

import { useState } from 'react';
import IconEyeOpen from '../assets/images/icon-eye-open.svg';
import IconEyeClose from '../assets/images/icon-eye-close.svg';
import Image from 'next/image';

interface OwnProps {
    name: string;
    value: string;
    placeholder: string;
    onChange(name: string, value: string): void;
}


export default function PasswordInput(props: OwnProps) {
    const {
        name,
        value,
        placeholder,
        onChange,
    } = props;

    const [inputType, setInputType] = useState<'text' | 'password'>('password');
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.currentTarget;

        onChange(name, value);
    };

    const onToggleVisibility = () => {
        if (inputType === 'text') {
            setInputType('password');
            return;
        }

        setInputType('text');
    };

    return (
        <div className="field-wrapper">
            <input
                type={inputType}
                name={name}
                value={value}
                onChange={onInputChange}
                placeholder={placeholder}
            />
            <button type="button" onClick={onToggleVisibility}>
                <Image
                    src={inputType === 'password' ? IconEyeOpen : IconEyeClose}
                    alt="Password visibility"
                />
            </button>
        </div>
    );
}
