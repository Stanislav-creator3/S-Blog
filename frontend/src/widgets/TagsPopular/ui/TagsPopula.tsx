import { useGetPopularTagsQuery } from "@/features/tags/api/tagsApi";
import { Tag } from "@/shared/ui/Tag/Tag";
import TagSkeleton from "@/shared/ui/Tag/TagSkeleton";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  className?: string;
}

const TagsPopular = ({ className }: Props) => {
  const { data, isLoading } = useGetPopularTagsQuery();
  return (
    <div className={cn(className, "w-full flex flex-wrap gap-2")}>
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <TagSkeleton key={index} />
          ))
        : data?.map((tag, index) => <Tag href={tag} key={index} text={tag} />)}
    </div>
  );
};

export default TagsPopular;
