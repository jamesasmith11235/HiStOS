import Link from "next/link";
import { apiGet, apiPost } from "@/lib/api";

type Deal = {
  id: string;
  name: string;
};

type DealsResponse = {
  data: Deal[];
};

export default async function Home() {
  const { data } = (await apiGet("/api/deals")) as DealsResponse;

  async function createDeal() {
    "use server";

    await apiPost("/api/deals", {
      // name could come from a form later; hard-coded for now
      name: "New Deal " + Date.now()
    });
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">HiStOS Deal List</h1>

      <form action={createDeal}>
        <button
          className="px-4 py-2 bg-black text-white rounded"
          type="submit"
        >
          Create Deal
        </button>
      </form>

      <ul className="mt-6 space-y-2">
        {data.map((deal) => (
          <li key={deal.id} className="border p-3 rounded bg-gray-50">
            <Link href={`/deals/${encodeURIComponent(deal.id)}`} className="underline">
              {deal.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
