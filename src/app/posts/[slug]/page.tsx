// import Blog from "@/components/Blog";
import { IPost, IPostFields } from "@/@types/contentful";
import Blog from "@/components/Blog";
import { client } from "@/lib/contentfull/client";

export async function generateStaticParams() {
  const response = await client.getEntries({ content_type: "post" });
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

async function getBlog(slug: string) {
  const res = await client.getEntries({
    content_type: "post",
    "fields.slug": slug,
  });
  return res?.items?.[0];
}

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const blog: IPost = await getBlog(params.slug);

  return (
    <div>
      <Blog blog={blog.fields} />
    </div>
  );
};

export default page;
