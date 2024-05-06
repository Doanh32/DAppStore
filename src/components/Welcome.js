import React from 'react';
import styled from 'styled-components';
import sunset from './../../sunset.jpg';
import './style.css';
import react from React;

export const OxygenButtons = styled.button
`  @import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap");
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

    return (
        <div class="welcomePage" style={{ backgroundImage: url($,{sunset}) }}>
            <div class = "container-test">
                <h1> Welcome to DApp Marketplace</h1>
            </div>
            <div class = "container">
                <OxygenButtons>
                    Connect Metamask!
                </OxygenButtons>
                <OxygenButtons>
                    Sell Products!
                </OxygenButtons>
                <OxygenButtons>
                    Purchase Products!
                </OxygenButtons>
            </div>
        </div>


    );
}