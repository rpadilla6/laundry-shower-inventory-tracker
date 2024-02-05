import { ActionFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  DistributionRecord,
  editDistributionRecord,
  getDistributionRecordById,
} from "../models/distribution_record";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { ZodIssue, z } from "zod";

import { entrySchema } from "../utils";
import invariant from "tiny-invariant";
import { redirect } from "react-router";
import { requireUserId } from "../session.server";

type LoaderData = {
  entry: DistributionRecord;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUserId(request);

  invariant(params.entryId, "entryId not found");
  const entry = await getDistributionRecordById(params.entryId);
  if (!entry) {
    return redirect("/entries");
  }

  return json({ entry });
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  const formPayload = Object.fromEntries(await request.formData());
  formPayload.profile_id = userId;
  const cleanedValues = Object.entries(formPayload).reduce(
    (acc, [key, value]) => {
      acc[key] = value === "on" ? true : value;
      return acc;
    },
    {} as Record<string, FormDataEntryValue | true>,
  );

  try {
    const newEntry = entrySchema.parse(cleanedValues);
    const entry = await editDistributionRecord({
      ...newEntry,
      id: params.entryId!,
      backpack: newEntry.backpack ?? null,
      blanket: newEntry.blanket ?? null,
      duffel_bag: newEntry.duffel_bag ?? null,
      tarp: newEntry.tarp ?? null,
      sleeping_bag: newEntry.sleeping_bag ?? null,
    });

    return redirect(`/entries`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({ errors: error?.issues });
    }
  }
};

export default function EntryEditPage() {
  const actionData = useActionData<{ errors?: ZodIssue[] }>();
  const loaderData = useLoaderData<typeof loader>() as LoaderData;
  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label
          htmlFor="first_name"
          className="block text-base font-medium leading-6 text-slate-900"
        >
          First Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="first_name"
            id="first_name"
            className="block w-full rounded-md border-0 pl-2 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Henry"
            defaultValue={loaderData.entry.first_name}
            aria-describedby="first_name-description"
            aria-errormessage="first_name-error"
          />
        </div>
        {actionData?.errors?.some((error) => error.path[0] === "first_name") ? (
          <p className="mt-2 text-sm text-red-400" id="first_name-error">
            {actionData?.errors
              ?.filter((error) => error.path[0] === "first_name")
              .map((error) => error.message)
              .join(", ")}
          </p>
        ) : (
          <p
            className="mt-2 text-sm text-slate-500"
            id="first_name-description"
          >
            Guest's first name
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="last_name"
          className="block text-base font-medium leading-6 text-slate-900"
        >
          Last Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="block w-full rounded-md border-0 pl-2 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Dubon"
            defaultValue={loaderData.entry.last_name}
            aria-describedby="last_name-description"
            aria-errormessage="last_name-error"
          />
        </div>
        {actionData?.errors?.some((error) => error.path[0] === "last_name") ? (
          <p className="mt-2 text-sm text-red-400" id="last_name-error">
            {actionData?.errors
              ?.filter((error) => error.path[0] === "last_name")
              .map((error) => error.message)
              .join(", ")}
          </p>
        ) : (
          <p className="mt-2 text-sm text-slate-500" id="last_name-description">
            Guest's last name
          </p>
        )}
      </div>
      {/* Create a horizontally scrolling div to hold checkbox items that are surrounded with labels, meaning they behave like buttons */}
      <div className="relative">
        <h4 className="block text-base font-medium leading-6 text-slate-900">
          Requested Items
        </h4>
        <div className="flex mt-2 flex-row space-x-2 overflow-x-auto text-3xl">
          <label
            htmlFor="backpack"
            className="flex space-x-2 px-2 py-1 justify-center items-center rounded-md bg-slate-200  has-[:checked]:bg-green-300"
          >
            <span>🎒</span>
            <input
              type="checkbox"
              name="backpack"
              id="backpack"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 checked:bg-green-700 focus:checked:bg-green-700 focus:checked:ring-green-700"
              defaultChecked={!!loaderData.entry.backpack}
              aria-describedby="backpack-description"
            />
            <p className="hidden" id="backpack-description">
              Check if guest received a backpack
            </p>
          </label>
          <label
            htmlFor="duffel_bag"
            className="flex space-x-2 px-2 py-1 justify-center items-center rounded-md bg-slate-200  has-[:checked]:bg-green-300"
          >
            <span>👜</span>
            <input
              type="checkbox"
              name="duffel_bag"
              id="duffel_bag"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 checked:bg-green-700 focus:checked:bg-green-700 focus:checked:ring-green-700"
              aria-describedby="duffel_bag-description"
              defaultChecked={!!loaderData.entry.duffel_bag}
            />
            <p className="hidden" id="duffel_bag-description">
              Check if guest received a duffel bag
            </p>
          </label>
          <label
            htmlFor="blanket"
            className="flex space-x-2 px-2 py-1 justify-center items-center rounded-md bg-slate-200  has-[:checked]:bg-green-300"
          >
            <span>🇶🇦</span>
            <input
              type="checkbox"
              name="blanket"
              id="blanket"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 checked:bg-green-700 focus:checked:bg-green-700 focus:checked:ring-green-700"
              aria-describedby="blanket-description"
              defaultChecked={!!loaderData.entry.blanket}
            />
            <p className="hidden" id="blanket-description">
              Check if guest received a blanket
            </p>
          </label>
          <label
            htmlFor="sleeping_bag"
            className="flex space-x-2 px-2 py-1 justify-center items-center rounded-md bg-slate-200  has-[:checked]:bg-green-300"
          >
            <span>🛏</span>
            <input
              type="checkbox"
              name="sleeping_bag"
              id="sleeping_bag"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 checked:bg-green-700 focus:checked:bg-green-700 focus:checked:ring-green-700"
              aria-describedby="sleeping_bag-description"
              defaultChecked={!!loaderData.entry.sleeping_bag}
            />
            <p className="hidden" id="sleeping_bag-description">
              Check if guest received a sleeping bag
            </p>
          </label>
          <label
            htmlFor="tarp"
            className="flex space-x-2 px-2 py-1 justify-center items-center rounded-md bg-slate-200  has-[:checked]:bg-green-300"
          >
            <span>⛺</span>
            <input
              type="checkbox"
              name="tarp"
              id="tarp"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 checked:bg-green-700 focus:checked:bg-green-700 focus:checked:ring-green-700"
              aria-describedby="tarp-description"
              defaultChecked={!!loaderData.entry.tarp}
            />
            <p className="hidden" id="tarp-description">
              Check if guest received a tarp
            </p>
          </label>
        </div>
        <div className="absolute pointer-events-none inset-y-0 right-0 h-full w-5 bg-gradient-to-r from-transparent to-white" />
      </div>
      <div>
        <label
          htmlFor="distribution_date"
          className="block text-base font-medium leading-6 text-slate-900"
        >
          Day of Distribution
        </label>
        <div className="mt-2">
          <input
            type="date"
            name="distribution_date"
            id="distribution_date"
            className="block w-full rounded-md border-0 pl-2 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            defaultValue={loaderData.entry.distribution_date}
            aria-describedby="distribution_date-description"
          />
        </div>
        <p
          className="mt-2 text-sm text-slate-500"
          id="distribution_date-description"
        >
          What day did they request these items? (autofilled to current date)
        </p>
      </div>
      <p>
        {actionData?.errors
          ?.filter(
            (error) =>
              error.path[0] !== "first_name" && error.path[0] !== "last_name",
          )
          .map((error) => (
            <span
              key={error.path.join("-")}
              className="mt-2 text-sm text-red-400"
            >
              {error.message}
            </span>
          ))}
      </p>
      <button
        type="submit"
        className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
      >
        Save
      </button>
    </Form>
  );
}
