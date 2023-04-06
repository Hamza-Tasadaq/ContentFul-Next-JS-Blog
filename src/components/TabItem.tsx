import { ICategoryFields } from "@/@types/contentful";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItemProps {
  category: ICategoryFields | {};
}

const TabItem: React.FC<TabItemProps> = ({ category }) => {
  const searchParams = usePathname();
  const isActiveLink = (slug: string) => searchParams.includes(slug);

  const { slug, name } = category as ICategoryFields;

  return (
    <li
      key={slug}
      className={`
                 mr-6 pb-2 border-b-4 rounded-sm  duration-300 
                 ${
                   isActiveLink(slug)
                     ? "border-[#53C099] text-[#53BD95]"
                     : "border-white text-gray-400 hover:border-[#53C099]"
                 }`}
    >
      <Link href={`/category/${slug}`}>{name}</Link>
    </li>
  );
};

export default TabItem;
