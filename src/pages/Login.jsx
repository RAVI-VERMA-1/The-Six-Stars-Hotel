import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Heading>Log in to your Account</Heading>
      <LoginForm />
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <p style={{ color: "orange" }}>
          Use following Login Credential, <br />
          Because it's an admin application and signup is protected
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p>
            <span style={{ color: "orange" }}>EMAIL</span> :<br />{" "}
            guest@sixstar.com
          </p>
          <p>
            <span style={{ color: "orange" }}>PASSWORD</span>: <br />
            DNS@12345
          </p>
        </div>
      </article>
    </LoginLayout>
  );
}

export default Login;
