import styled, { keyframes } from "styled-components";

const shadow = keyframes`
    to {
      box-shadow: 0px 0px 70px 25px;
      opacity: 0;
    }
`;

export const Button = styled.button`
  outline: none !important;
  border: none;
  background: transparent;
  :hover {
    cursor: pointer;
  }

  &.login100-form-btn {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.5;
    color: #000000;
    text-transform: uppercase;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    background: #f05837;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  &.login100-form-btn:hover {
    color: #ffffff;
    background: #000000;
  }
  &.login100-form-btn:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: auto;
  }
`;

export const Div = styled.div`
  &.limiter {
    width: 100%;
    margin: 0 auto;
  }

  &.container-login100 {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    @media (max-width: 768px) {
      padding: 0px;
    }
    //background-color: transparent;
    //background: -webkit-linear-gradient(-135deg, #f05837, #000000);
    //background: -o-linear-gradient(-135deg, #f05837, #000000);
    //background: -moz-linear-gradient(-135deg, #f05837, #000000);
    //background: linear-gradient(-135deg, #f05837, #000000);
  }

  &.wrap-login100 {
    width: 450px;
    background: #2f353a;
    border-radius: 10px;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 70px;
    @media (max-width: 992px) {
      padding: 70px 70px;
    }
    @media (max-width: 768px) {
      padding: 70px 70px;
    }
    @media (max-width: 576px) {
      padding: 70px 10px;
    }
  }

  &.wrap-input100 {
    position: relative;
    width: 100%;
    z-index: 1;
    margin-bottom: 20px;
  }

  &.container-login100-form-btn {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 20px;
  }
`;
export const Form = styled.form`
  &.login100-form {
    width: 350px;
  }
`;

export const Span = styled.span`
  &.login100-form-title {
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: #fff;
    line-height: 1;
    text-align: center;

    width: 100%;
    display: block;
    padding-bottom: 40px;
  }

  &.focus-input100 {
    display: block;
    position: absolute;
    border-radius: 25px;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 0px 0px;
    color: rgba(240, 88, 55, 0.8);
  }
  /*rgba(87,184,70, 0.8)*/

  &.symbol-input100 {
    font-size: 15px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    position: absolute;
    border-radius: 25px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-left: 35px;
    pointer-events: none;
    color: #666666;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  &.input100:focus + &.focus-input100 + &.symbol-input100 {
    color: #f05837;
    padding-left: 28px;
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
  :focus::-webkit-input-placeholder {
    color: transparent;
  }
  :focus:-moz-placeholder {
    color: transparent;
  }
  :focus::-moz-placeholder {
    color: transparent;
  }
  :focus:-ms-input-placeholder {
    color: transparent;
  }
  ::-webkit-input-placeholder {
    color: #000000;
  }
  :-moz-placeholder {
    color: #000000;
  }
  ::-moz-placeholder {
    color: #000000;
  }
  :-ms-input-placeholder {
    color: #000000;
  }

  &.input100:focus + .focus-input100 {
    -webkit-animation: ${shadow} 0.5s ease-in-out forwards;
    animation: ${shadow} 0.5s ease-in-out forwards;
  }

  &.input100 {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
    color: #000000;
    display: block;
    width: 100%;
    background: #e6e6e6;
    height: 50px;
    border-radius: 25px;
    padding: 0 0 0 60px;
  }
`;
