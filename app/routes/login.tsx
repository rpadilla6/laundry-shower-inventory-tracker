import React from "react";
import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { validateEmail } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Login",
    },
  ];
};

interface ActionData {
  errors: {
    email?: string;
    password?: string;
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json({ errors: { email: "Email is invalid." } }, { status: 400 });
  }

  if (typeof password !== "string") {
    return json(
      { errors: { password: "Valid password is required." } },
      { status: 400 },
    );
  }

  if (password.length < 6) {
    return json(
      { errors: { password: "Password is too short" } },
      { status: 400 },
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password" } },
      { status: 400 },
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/entries",
  });
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/entries";

  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef?.current?.focus();
    }

    if (actionData?.errors?.password) {
      passwordRef?.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex flex-col justify-center min-h-full">
      <div className="w-full max-w-md px-8 mx-auto">
        <Form method="post" className="space-y-6" noValidate id="login-form">
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              <span className="block text-gray-700">Email Address</span>
              {actionData?.errors?.email && (
                <span className="block pt-1 text-red-700" id="email-error">
                  {actionData?.errors?.email}
                </span>
              )}
            </label>
            <input
              className="w-full px-2 py-1 text-lg border border-gray-500 rounded"
              autoComplete="email"
              type="email"
              name="email"
              id="email"
              aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="email-error"
              ref={emailRef}
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">
              <span className="block text-gray-700">Password</span>
              <span className="block font-light text-gray-700">
                Must have at least 6 characters.
              </span>
              {actionData?.errors?.password && (
                <span className="pt-1 text-red-700" id="password-error">
                  {actionData?.errors?.password}
                </span>
              )}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete=""
              className="w-full px-2 py-1 text-lg border border-gray-500 rounded"
              aria-invalid={actionData?.errors?.password ? true : undefined}
              aria-describedby="password-error"
              ref={passwordRef}
            />
          </div>
          <button
            className={`${
              navigation.state !== "idle" ? "animate-pulse" : ""
            } w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-400`}
            type="submit"
            disabled={navigation.state !== "idle"}
          >
            Log in
          </button>
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                id="remember"
                name="remember"
                type="checkbox"
              />
              <label
                className="block ml-2 text-sm text-gray-900"
                htmlFor="remember"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <Link
                className="text-blue-500 underline"
                to={{ pathname: "/join" }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
