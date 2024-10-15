

import React, { useState } from 'react';

const PhoneDialer: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [modal, setModal] = useState('');
    const [message, setMessage] = useState('');

    const hideAllModals = () => {
        setModal('');
    };

    const showModal = (modalName: string) => {
        hideAllModals();
        setModal(modalName);
    };

    const addToDNC = async () => {
        if (phoneNumber) {
            try {
                const response = await fetch('/api/dnc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                    body: JSON.stringify({ phoneNumber }),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to add to DNC list');
                }
    
                setMessage(`${phoneNumber} has been added to DNC list`);
                showModal('addToDncModal');
            } catch (error) {
                console.error(error);
                // Handle error, e.g. show an error message
            }
        } else {
            showModal('enterNumberModal');
        }
    };

    const dialNumber = async () => {
        if (phoneNumber) {
            try {
                const response = await fetch(`/api/dnc/${phoneNumber}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to check DNC list');
                }
    
                const data = await response.json();
    
                if (data.isInDnc) {
                    showModal('dncModal');
                } else {
                    showModal('dialingModal');
                }
            } catch (error) {
                console.error(error);
                // Handle error, e.g. show an error message
            }
        } else {
            showModal('enterNumberModal');
        }
    };

    return (
        <section>
            <h1 id='phoneH1'>Phone Dialer</h1>

            <div className="container">
                <input
                    type="text"
                    className="inputField"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                />
            </div>

            <div className="container">
                <button id='callButton' onClick={dialNumber}>Call</button>
                <button id='dncButton' onClick={addToDNC}>DNC</button>
            </div>

            {/* Modals would go here */}
            {modal === 'addToDncModal' && <div>{message}</div>}
            {modal === 'dncModal' && <div>This number is on the DNC</div>}
            {modal === 'dialingModal' && <div>Dialing...</div>}
            {modal === 'enterNumberModal' && <div>Please enter a valid phone number</div>}
        </section>
    );
}

export default PhoneDialer;