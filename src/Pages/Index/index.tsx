import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ContentBox from "../../Components/ContentBox";
import Button from "../../Components/Button";

interface IProps {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Index: React.FC<IProps> = ({ authenticated, setAuthenticated }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authenticated) return;
    navigate("/tasks");
  }, [authenticated, navigate]);

  function handleButtonClick() {
    setAuthenticated(true);
  }

  return (
    <ContentBox>
      <h1>Index (login) page</h1>
      <Button onClick={handleButtonClick}>Login</Button>
    </ContentBox>
  );
};

export default Index;
