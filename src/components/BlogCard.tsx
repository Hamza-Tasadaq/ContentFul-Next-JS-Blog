import { IAuthorFields, IPostFields, IFile } from "@/@types/contentful";
import { formatDate } from "@/lib/utils";
import { Asset } from "contentful";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  fields: IPostFields | {};
}

const BlogCard: React.FC<BlogCardProps> = ({ fields }) => {
  // Destructuring Props
  const {
    title,
    slug,
    excerpt,
    date,
    author: BlogAuthor,
  } = fields as IPostFields;

  //   Destructuring Author
  const author: IAuthorFields = BlogAuthor.fields as IAuthorFields;
  //   Destructuring Author Picture
  const picture: Asset = author.picture;

  //   Destructuring Picture File
  const profile: IFile = picture.fields.file as IFile;

  return (
    <div>
      <Link href={`/posts/${slug}`}>
        <h1 className="text-xl text-gray-600 font-bold hover:decoration-2 hover:underline hover:cursor-pointer hover:decoration-[#53BD95]">
          {title}
        </h1>
      </Link>
      <div className="flex items-center my-4">
        <div className="rounded-lg overflow-hidden flex items-center justify-center mr-2">
          <Image
            src={`https:${profile.url}`}
            alt="avatar"
            height={40}
            width={40}
          />
        </div>
        <span className="text-sm font-bold text-gray-600">
          {author.name} on &nbsp;
          <span className="text-gray-400">{formatDate(date)}</span>
        </span>
      </div>
      <div className="text-gray-500">
        {excerpt.slice(0, 250)}
        {excerpt.length > 250 && "..."}
      </div>
    </div>
  );
};

export default BlogCard;
