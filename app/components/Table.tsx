import { DistributionRecord } from "../models/distribution_record";
import { Link } from "@remix-run/react";
import { getEmojiStringForEntry } from "../utils";

export default function Table({ entries }: { entries: DistributionRecord[] }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-0"
              >
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 lg:table-cell"
              >
                Items
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 table-cell"
              >
                Date
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:w-auto sm:max-w-none sm:pl-0">
                  {`${entry.first_name} ${entry.last_name}`}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Items</dt>
                    <dd className="text-lg truncate text-slate-700">
                      {getEmojiStringForEntry(entry)}
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-slate-500 lg:table-cell">
                  {getEmojiStringForEntry(entry)}
                </td>
                <td className="px-3 py-4 text-sm text-slate-500 table-cell">
                  {new Date(entry.distribution_date).toLocaleDateString(
                    "en-US",
                    { timeZone: "UTC" },
                  )}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <Link
                    to={`/entries/${entry.id}`}
                    unstable_viewTransition
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                    <span className="sr-only">
                      , {`${entry.first_name} ${entry.last_name}`}
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
