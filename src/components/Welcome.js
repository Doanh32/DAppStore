import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

import styled from 'styled-components';

export const OxygenButtons = styled.button`
    @import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap");
    background-color: #967bb6;
    font-family: "Oxygen", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 25px;
    margin: 0px 50px;
    padding: 20px 20px;
    color: white;

`

export function Welcome() {

    const navigate = useNavigate();

    function navBuy() {
        navigate('/buyitems');
    }

    function navSell() {
        navigate('/sellitems')
    }

    function navConnect() {
        navigate('/connectwallet')
    }

    return (
        <div class="welcomePage" style={{ backgroundImage: "url(/../sunset.jpg)" }}>
            <div class = "container-test">
                <h1> Welcome to DApp Marketplace</h1>
            </div>
            <div class = "container">
                <OxygenButtons onClick={navBuy}>
                    Buy Items
                </OxygenButtons>
                <OxygenButtons onClick={navSell}>
                    Sell Items
                </OxygenButtons>
                <OxygenButtons onClick={navConnect}>
                    Connect Wallet
                </OxygenButtons>
            </div>
        </div>


    );
}