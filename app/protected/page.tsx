
import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Logo from "@/components/LogoButton";
import { DataTable } from "./_components/data-table";
import { z } from "zod";
import { taskSchema } from "./_data/schema";
import { promises as fs } from "fs";
import path from "path";
import { getCategories, getSites } from "../_db/action";
import { columns, createColumns } from "./_components/columns";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/protected/_data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

// interface SitesProps {
//   id: number;
//   location: string;
//   name: string;
//   created_at: Date;
//   description: string;
//   imageUrl: string;
//   latitude: number;
//   longitude: number;
//   category: string;
//   updatedAt: Date;
// }

export default async function ProtectedPage() {
  const supabase = createClient();



  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: sites } = await supabase.from("sites").select();
  // const [sites, setSites] = useState([]);

  const sitesList = await getSites();
  const categories = await getCategories();
  // console.log(categories, "Here" );

  const dataWithCategories = sitesList.map((site) => ({
    ...site,
    category:
      categories.find((cat) => cat.id === site.category)?.category || "Unknown",
  }));

  // console.log(dataWithCategories, "here");

  // console.log(createColumns([]), "HERE");
  // console.log(columns, "Here");

  // const columns2 = createColumns(categories);

  const tasks = await getTasks();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      {/* <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div> */}
      {/* <pre>{JSON.stringify(sites, null, 2)}</pre> */}

      <div className="w-full space-y-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Welcome back {user.user_metadata.name}!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of tour sites!
            </p>
          </div>
          <div className="flex items-center space-x-2">.</div>
        </div>
        {/* <DataTable data={sitesList} columns={columns} /> */}
        <DataTable data={dataWithCategories} columns={columns} />
      </div>

 

      {/* <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          <FetchDataSteps />
        </main>
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer> */}
    </div>
  );
}
