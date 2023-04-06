import { IPostFields, IAuthorFields, IFile } from "@/@types/contentful";
import { Asset } from "contentful";
import { formatDate } from "@/lib/utils";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";

const options = {
  renderMark: {
    [MARKS.CODE]: (text: any) => {
      return (
        <pre>
          <code>{text}</code>
        </pre>
      );
    },
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      if (
        node.content.find((item: any) =>
          item.marks?.find((mark: any) => mark.type === "code")
        )
      ) {
        return (
          <div>
            <pre>
              <code>{children}</code>
            </pre>
          </div>
        );
      }

      return <p>{children}</p>;
    },

    [INLINES.ENTRY_HYPERLINK]: (node: any) => {
      if (node.data.target.sys.contentType.sys.id === "post") {
        return (
          <Link href={`/posts/${node.data.target.fields.slug}`}>
            {node.data.target.fields.title}
          </Link>
        );
      }
    },

    [INLINES.HYPERLINK]: (node: any) => {
      const text = node.content.find(
        (item: any) => item.nodeType === "text"
      )?.value;
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
    },

    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
        return (
          <iframe
            height="400"
            width="100%"
            src={node.data.target.fields.embedUrl}
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        );
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      return (
        <Image
          src={`https:${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.title}
          className=""
        />
      );
    },
  },
};

interface BlogProps {
  blog: IPostFields | {};
}

const Blog: React.FC<BlogProps> = ({ blog }) => {
  const {
    title,
    slug,
    author: BlogAuthor,
    coverImage,
    date,
    category,
    content,
  } = blog as IPostFields;

  //   Destructuring Author

  const author: IAuthorFields = BlogAuthor.fields as IAuthorFields;
  //   Destructuring Author Picture
  const picture: Asset = author.picture;

  //   Destructuring Picture File
  const profile: IFile = picture.fields.file as IFile;

  return (
    <div className="my-12 grid lg:grid-cols-3 gap-12 single-article">
      <div className="col-span-2">
        <h1 className="text-3xl font-bold py-2">{title}</h1>
        <div className="flex items-center my-4">
          <div className="rounded-lg overflow-hidden flex items-center justify-center mr-2">
            <Image
              src={`https:${profile.url}`}
              alt="author"
              height={40}
              width={40}
            />
          </div>
          <span className="text-sm font-bold text-gray-600">
            Hamza Tasadaq on &nbsp;
            <span className="text-gray-400">{formatDate(date)}</span>
          </span>
        </div>
        <div className="text-lg text-gray-600 leading-8">
          {/* <img
            className="w-full my-12 mb-6"
            src={`https:${profile.url}`}
            alt={coverImage.fields.title}
          /> */}
          {}
          <div className="prose w-full">
            {documentToReactComponents(content, options)}
          </div>
        </div>
      </div>
      <div className="sticky top-0">
        <h2 className="font-bold text-gray-600 text-lg">
          Signup to our newsletter
        </h2>
        <p className="mt-4 text-gray-500">
          Get the latest article on all things data delivered straight to your
          inbox
        </p>
        <input
          className="border w-full p-2 pl-3 my-6 outline-[#53BD95]"
          type="email"
          placeholder="Your work email"
        />
        <button className="border-2 border-[#53BD95] rounded py-1 px-6 text-[#53BD95] font-bold">
          Subscribe
        </button>
        <hr className="my-6 border-gray-100" />
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <span className="text-gray-500 mr-2">Share</span>
          <a className="text-gray-500">
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-500">
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-500">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-500">
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
        <hr className="my-6 border-gray-100" />
      </div>
    </div>
  );
};

export default Blog;
