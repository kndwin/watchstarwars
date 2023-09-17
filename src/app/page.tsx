import { Text } from "@/components/text";
import { columns } from "./_components/columns";
import { StarwarDataTable } from "./_components/data-table";
import { getData } from "./_api";

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-center mb-8">
        <Text variant={"h1"}>Starwars Guide</Text>
        <Text>{"Watch StarWars in chronological order"}</Text>
      </div>
      <StarwarDataTable columns={columns} data={data} />
    </main>
  );
}
