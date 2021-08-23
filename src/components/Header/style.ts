import styled from 'styled-components'

export const HeaderContainer = styled.div`
  .header {
    width: 100%;
    height: 73px;
    padding: 13.5px 20px 12.5px;
    border: solid 1px #707070;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .bg-green {
    background-color: var(--color-green);
  }

  .menu-logo {
    cursor: pointer;
    fill: #fae2ca;
    width: 37px;
  }

  .logo-image {
    width: 98px;
    height: 47px;
    object-fit: contain;
  }

  .user-logo-circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #fae2ca;
  }

  .fixed {
    position: fixed;
    z-index: 10;
  } 

  .container{
    width: 100%
  }

  .login-button{
    color: 'white'
  }
`