import { client } from "@/lib/contentfull/client";
import { use, Suspense } from "react";
import Tabs from "./Tabs";

async function getCategories() {
  const res = await client.getEntries({
    content_type: "category",
    select: "fields",
  });
  return res;
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const categories = use(getCategories());
  return (
    <div>
      <Tabs categories={categories.items} />
      {children}
    </div>
  );
};

export default MainLayout;
