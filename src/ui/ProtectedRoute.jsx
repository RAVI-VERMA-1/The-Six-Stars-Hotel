import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1.Load the authenticated User-----
  const { user, isLoading, isAuthenticated } = useUser();

  // 2. if no user is authenticated then navigate /login-----

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //   3.Show Spinner while Loading state-----
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  //if there is a user then render the whole app----
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
