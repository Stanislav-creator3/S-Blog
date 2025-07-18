import { useGetMeFollowQuery } from "@/features/follow/api/followApi";
import { LoadingCircleSpinner } from "@/shared/ui/LoadingCircleSpinner/LoadingCircleSpinner";
import { FollowList } from "@/widgets/FollowList";

const AllFollowerPage = () => {
  const { data, isLoading } = useGetMeFollowQuery();
  return isLoading ? (
    <LoadingCircleSpinner className="h-[80vh]" />
  ) : data && data?.length > 0 ? (
    <FollowList data={data} title="Все подписчики" />
  ) : (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center">
      <p className="max-w-100 text-[3rem] text-center font-bold">
        У вас пока нету подписчиков
      </p>
      <span className="text-[7rem]">🥺</span>
    </div>
  );
};
export default AllFollowerPage;
