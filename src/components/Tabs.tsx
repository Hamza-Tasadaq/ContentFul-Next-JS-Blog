"use client";
import { ICategory, ICategoryFields } from "@/@types/contentful";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TabItem from "./TabItem";

interface TabsProps {
  categories: ICategory[];
  //   handleOnSearch: () => void;
}

const Tabs: React.FC<TabsProps> = ({ categories }) => {
  const searchParams = usePathname();

  return (
    <div className="flex my-2 items-center justify-between border-b-2 border-gray-100">
      <ul className="flex items-center">
        <li
          className={`mr-6 pb-2 border-b-4 rounded-sm 
                        ${
                          searchParams === "/"
                            ? "border-[#53C099] text-[#53BD95]"
                            : "border-white text-gray-400 hover:border-[#53C099]"
                        }`}
        >
          <Link href="/">Recent</Link>
        </li>

        {categories?.map((category) => {
          const { slug } = category.fields as ICategoryFields;
          return <TabItem key={slug} category={category.fields} />;
        })}
      </ul>
    </div>
  );
};

export default Tabs;
