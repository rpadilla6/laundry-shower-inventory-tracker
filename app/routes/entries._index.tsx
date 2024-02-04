import { Link } from "react-router-dom";

export default function EntriesIndexPage() {
  return (
    <div className="flex justify-center items-center">
      <Link
        to="new"
        className="bg-slate-200 rounded-lg px-4 py-3 text-lg font-bold text-slate-700"
      >
        New Entry ✅
      </Link>
    </div>
  );
}
