import { ICategory, IPost, IPostFields } from "@/@types/contentful";
import BlogList from "@/components/BlogList";
import MainLayout from "@/components/MainLayout";
import { client } from "@/lib/contentfull/client";

export async function generateStaticParams() {
  const response = await client.getEntries({
    content_type: "category",
  });
  const paths = response.items.map((item: IPost) => {
    const { slug } = item.fields as IPostFields;
    return {
      params: { slug },
    };
  });

  return paths.map(
    (path: {
      params: {
        slug: string;
      };
    }) => ({
      slug: path.params.slug,
    })
  );
}

async function getCategory(slug: string) {
  const res = await client.getEntries({
    content_type: "category",
    "fields.slug": slug,
  });
  return res?.items?.[0];
}

async function getBlogs(slug: string) {
  const res = await client.getEntries({
    content_type: "post",
    "fields.category.sys.id": slug,
  });
  return res.items;
}

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = params;
  // Getting the Category Using the Slug
  const category: ICategory = await getCategory(slug);
  // Getting the Blogs Using the Category ID
  const blogs: IPost[] = await getBlogs(category.sys.id);
  return (
    <MainLayout>
      <BlogList blogsList={blogs} />
    </MainLayout>
  );
};

export default page;
