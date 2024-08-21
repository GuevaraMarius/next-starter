import { useRouter } from "next/router";
import React, { useEffect } from "react";
const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null;
};

export default Home;
