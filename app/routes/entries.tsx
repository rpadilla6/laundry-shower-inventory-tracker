import {
  DistributionRecord,
  getLatestDistributionRecords,
} from "../models/distribution_record";
import { LoaderFunctionArgs, json } from "@remix-run/node";

import { Header } from "../components/Header";
import { Outlet } from "react-router";
import Table from "../components/Table";
import { Link, useLoaderData, useNavigation } from "@remix-run/react";

type LoaderData = {
  entries: DistributionRecord[];
  limit: number;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit");
  const parsedLimit = limit ? parseInt(limit, 10) : 25;
  const entries = await getLatestDistributionRecords(parsedLimit);
  return json({ entries, limit: parsedLimit });
}

export default function EntriesPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  const navigation = useNavigation();
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
          <h2 className="text-2xl font-bold text-center text-slate-800">
            Latest Entries
          </h2>
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
