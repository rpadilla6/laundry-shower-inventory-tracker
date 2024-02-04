import {
  DistributionRecord,
  getLatestDistributionRecords,
} from "../models/distribution_record";
import { LoaderFunctionArgs, json } from "@remix-run/node";

import { Header } from "../components/Header";
import { Outlet } from "react-router";
import { useLoaderData } from "@remix-run/react";

type LoaderData = {
  entries: DistributionRecord[];
};

export async function loader({}: LoaderFunctionArgs) {
  const entries = await getLatestDistributionRecords();
  return json({ entries });
}

export default function EntriesPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  console.log(data);
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="flex flex-col h-full bg-white">
        <div className="w-full p-6">
          <Outlet />
        </div>
        <div className="flex-1 p-6 border-t border-t-slate-100">
          <h2 className="text-2xl font-bold text-center text-slate-800">
            Latest Entries
          </h2>
          <ul>
            {data.entries.map((entry) => (
              <li key={entry.id}>
                <p>
                  {`${entry.first_name} ${entry.last_name}`} -{" "}
                  {entry.distribution_date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
