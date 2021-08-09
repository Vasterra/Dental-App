import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f286;
`

export const Modal = styled.div`
    width: 250px;
    padding: 5px 20px;
    border-radius: 10px;
    margin: 20px;
    background-color: azure;
    .dark & {
       background: #3B4042;
    }
`

export const ModalHeader = styled.div`
    height: 30px;
    display: flex;
    align-items: center;

    & .title{
        font-weight: 500;
        font-size: 18px;
    }

    .dark & .title {
        color: #D4D5D7;
    }
`

export const ModalBody = styled.div`
    margin: 10px 0;
`

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;


    & button{
        background-color: #fff;
        padding: 5px 15px;
        font-size: 18px;
        cursor: pointer;
        border: none;
        outline: none;
        text-transform:uppercase
    }

    & .cancel{
        background: transparent;
        color: #0892cf;
    }

    & .submit{
        color: #fff;
        background-color: #0892cf; 
        border-radius: 5px;
    }
`