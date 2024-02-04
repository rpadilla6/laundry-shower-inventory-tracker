import { Form, Link, useLocation } from "react-router-dom";

import { useUser } from "../utils";

export const Header = () => {
  const user = useUser();
  const location = useLocation();

  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      {location.pathname.startsWith("/notes") ? (
        <h1 className="text-xl font-bold">
          <Link to="/entries">Recording</Link>
        </h1>
      ) : (
        <h1 className="text-3xl font-bold">
          <Link to="/notes">Notes</Link>
        </h1>
      )}
      <p>{user.email}</p>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    </header>
  );
};
