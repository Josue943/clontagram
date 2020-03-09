import styled from "@emotion/styled";

export const Input = styled.input`
  margin: 5px 0;
  padding: 8px 5px;
  font-size: 1.4rem;
  border: 1px solid #c1c0c0;
  outline-color: #a9a9a9;
`;

export const Button = styled.button`
  background: ${props => (props.bgColor ? "#3897f0" : "white")};
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: ${props => (props.bgColor ? "white" : "#3897f0")};
  font-family: 2rem;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  display: block;
  width: 100%;
  :disabled {
    cursor: not-allowed;
    background: #95bbdf;
  }
`;

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-flow: column wrap;
`;

export const Error = styled.div`
  background: #ff0009;
  color: white;
  padding: 8px;
  margin: 10px 0;
  text-align: center;
`;

export const ErrorField = styled.div`
  text-align: initial;
  color: #ff0009;
  font-size: 15px;
`;

export const A = styled.a`
  width: 150px;
  text-align: center;
  background: #3897f0;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: white;
  font-family: 2rem;
  font-weight: 700;
  cursor: pointer;
  display: block;
`;
