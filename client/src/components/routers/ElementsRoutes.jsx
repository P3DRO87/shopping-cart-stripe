import { useRoutes } from "react-router";
import { routes } from "../../routes/routes";

const ElementsRoutes = () => {
   const elementsRoutes = useRoutes(routes());

   return elementsRoutes;
};

export default ElementsRoutes;
