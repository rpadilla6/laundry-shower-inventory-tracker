import { Form, Link, useLocation } from "react-router-dom";

import { useUser } from "../utils";

export const Header = () => {
  const user = useUser();
  const location = useLocation();

  return (
    <header
      className="z-10 flex items-center justify-between p-4 text-white bg-slate-800"
      style={{ viewTransitionName: "header" }}
    >
      <h1 className="text-3xl font-bold">
        <Link to="/entries">Inventory</Link>
      </h1>
      <p>{user.email}</p>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="px-4 py-2 text-blue-100 rounded bg-slate-600 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    </header>
  );
};
