import {
  DistributionRecord,
  getDistributionRecords,
  getLatestDistributionRecords,
} from "../models/distribution_record";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";

import { Header } from "../components/Header";
import { Outlet } from "react-router";
import Table from "../components/Table";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { requireUser, requireUserId } from "~/session.server";

type LoaderData = {
  entries: DistributionRecord[];
  limit: number;
  search: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request);
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit");
  const search: string = url.searchParams.get("search") || "";
  const parsedLimit = limit ? parseInt(limit, 10) : 25;
  const entries = search
    ? await getDistributionRecords({
        searchTerm: search,
        limit: parsedLimit,
      })
    : await getLatestDistributionRecords(parsedLimit);
  return json({ entries, limit: parsedLimit, search });
}

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit");
  const parsedLimit = limit ? parseInt(limit, 10) : 25;

  const formPayload = Object.fromEntries(await request.formData());
  return redirect(`/entries?search=${formPayload.search}&limit=${parsedLimit}`);
}

export default function EntriesPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("search");
  return (
    <div className="flex flex-col h-full min-h-screen">
      <Header />
      <main className="flex flex-col h-full bg-white">
        <div className="w-full p-6">
          <Outlet />
        </div>
        <div
          className="flex-1 p-6 bg-white border-t border-t-slate-100"
          style={{ viewTransitionName: "table" }}
        >
          <Form method="post" className="flex flex-col items-start">
            <label
              htmlFor="search"
              className="text-2xl font-bold text-center text-slate-800"
            >
              {data.search ? "Related" : "Latest"} Entries
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Here"
              className="w-full p-2 mt-4 border rounded-md border-slate-300"
            />
            <div className="flex self-end justify-between mt-4 space-x-2 ">
              <Link
                to="/entries"
                className="px-4 py-2 text-center rounded bg-slate-200 text-slate-700 hover:bg-slate-400 focus:bg-slate-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={searching}
                className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-400 ${
                  searching ? "animate-pulse" : ""
                }`}
              >
                Search
              </button>
            </div>
          </Form>
          <Table entries={data.entries} />
          <Link
            to={`?limit=${data.limit + 25}`}
            className={`${
              navigation.state !== "idle" ? "animate-pulse" : ""
            } block w-full py-2 mt-4 text-center text-white bg-slate-800 rounded-md`}
          >
            Load More
          </Link>
        </div>
      </main>
    </div>
  );
}
