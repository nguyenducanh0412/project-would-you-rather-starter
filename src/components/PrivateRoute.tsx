import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../rootReducer";

interface PropType {
  component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
  const location = useLocation();

  const { data: isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const pathName = location.pathname !== "/" ? location.pathname : "/";

  if (isAuthenticated) return <Component />;
  return <Navigate to={`/login?url=${pathName}`} />;
};

export default PrivateRoute;
