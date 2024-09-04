import React, { useEffect } from "react";
import { useRouter } from "next/router";

// HOC to protect pages
const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
