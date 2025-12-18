import React from "react";
import useSession from "../hooks/useSession";
import DisplayNameEntry from "../components/DisplayNameEntry";

const DisplayNamePage: React.FC = () => {
  const { displayNameSet } = useSession();

  // Only show this page if display name is NOT set
  if (displayNameSet) {
    return null;
  }

  return <DisplayNameEntry />;
};

export default DisplayNamePage;
