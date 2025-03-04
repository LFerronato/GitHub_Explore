import styled, { css } from 'styled-components'
import { shade } from 'polished'

export const Title = styled.h1`
  font-size: 48px;
  color: #3A3A3A;
  max-width: 433px;
  line-height: 56px;

  margin-top: 80px;
  margin-bottom: 40px;
`

interface FormProps {
  hasError: boolean
}
export const Form = styled.form<FormProps>`
  max-width: 700px;

  display: flex;
  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 1px solid #fff;
    border-right: 0;
    /* basicamente para passar os parametros  */
    ${(props) => props.hasError && css`
      border-color: #c53030;
    `}

    &::placeholder {
      color: #a8a8b3;
    }
  }
  button {
    width: 210px;
    background: #04D361;
    border: 0;
    border-radius: 0px 5px 5px 0px;

    color: #fff;
    font-weight: bold;

    transition: background-color 0.1s;
    &:hover {
      background-color: ${shade(0.2, '#04D361')};
    }
  }
`
export const Error = styled.span`
  display: block;
  color: #c53030;
`
export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;
  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;

    transition: transform 0.2s;
    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

    img {
      border-radius: 50%;
      width: 64px;
      height: 64px;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3D3D4D;
      }
      p {
        font-size: 18px;
        color: #A8A8B3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #C9C9D4;
    }
  }
`
