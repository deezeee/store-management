import React from 'react';

export default function InputText({
    autoFocus,
    onChange,
    type = 'text',
    value,
    placeholder,
    onError,
    showPassword = false,
    maxLines = 1,
    appearance = 'outline', // outline | filled | standard 
    
}) {
    return (
    <input
        className={['InputText', appearance]}
        type="text"
    >
    </input>);
}
