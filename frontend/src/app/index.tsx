import { RouterProvider } from "react-router";
import { router } from "./routing";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </>
  );
};
