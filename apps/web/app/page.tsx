import { apiGet, apiPost } from "@/lib/api";

export default async function Home() {
  const deals = await apiGet("/api/deals");

  async function createDeal() {
    "use server";
    await apiPost("/api/deals", {
      name: "New Deal " + Date.now()
    });
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">HiStOS Deal List</h1>

      <form action={createDeal}>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Create Deal
        </button>
      </form>

      <ul className="mt-6 space-y-2">
        {deals.data.map((deal: any) => (
          <li key={deal.id} className="border p-3 rounded">
            {deal.name}
          </li>
        ))}
      </ul>
    </main>
  );
}

