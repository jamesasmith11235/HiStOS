import Link from "next/link";
import { apiGet } from "@/lib/api";

type Deal = {
  id: string;
  name: string;
};

type DealResponse = {
  data: Deal;
};

type DealPageProps = {
  params: { id: string };
};

export default async function DealPage({ params }: DealPageProps) {
  const { id } = params;

  const { data: deal } = (await apiGet(
    `/api/deals/${encodeURIComponent(id)}`
  )) as DealResponse;

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <Link href="/" className="text-sm underline">
        ← Back to all deals
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{deal.name}</h1>
      <p className="mt-2 text-sm text-gray-500">Deal ID: {deal.id}</p>

      <section className="mt-8 space-y-4">
        <div className="border rounded p-4 bg-gray-50">
          <h2 className="font-semibold mb-2 text-lg">Summary</h2>
          <p className="text-sm text-gray-600">
            This is where the HiStOS summary, risk badge, and key deal metrics
            will live.
          </p>
        </div>

        <div className="border rounded p-4 bg-white">
          <h2 className="font-semibold mb-2 text-lg">Next steps</h2>
          <p className="text-sm text-gray-600">
            Future sections: Documents, LOI, Timeline, and Issues tabs. For now,
            this page proves our full-stack routing is working.
          </p>
        </div>
      </section>
    </main>
  );
}
