import { useSession } from "next-auth/react";
import React from "react";

function Contracts() {
  const { data: session } = useSession();
  return <div>Contracts</div>;
}

export default Contracts;
