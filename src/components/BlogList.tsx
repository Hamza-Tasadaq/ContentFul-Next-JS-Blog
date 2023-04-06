import { IPost, IPostFields } from "@/@types/contentful";
import BlogCard from "./BlogCard";
// import BlogCardWithImage from "./BlogCardWithImage";

interface BlogListProps {
  blogsList: IPost[];
}

const BlogList: React.FC<BlogListProps> = ({ blogsList }) => {
  return (
    <div className="grid lg:grid-cols-2 grid-gap gap-16 mt-16">
      {blogsList?.map((blog) => {
        const { slug } = blog.fields as IPostFields;
        return <BlogCard key={slug} fields={blog.fields} />;
      })}
      {/* <BlogCardWithImage /> */}
    </div>
  );
};

export default BlogList;
