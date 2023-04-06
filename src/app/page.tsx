import { IPost } from "@/@types/contentful";
import BlogList from "@/components/BlogList";
import MainLayout from "@/components/MainLayout";
import Tabs from "@/components/Tabs";
import { client } from "@/lib/contentfull/client";

async function getBlogs() {
  const res = await client.getEntries({
    content_type: "post",
  });
  return res.items;
}

export default async function Home() {
  const blogs: IPost[] = await getBlogs();
  return (
    <div>
      <MainLayout>
        <BlogList blogsList={blogs} />
      </MainLayout>
    </div>
  );
}
