import { useGetMyFollowingsQuery } from "@/features/follow/api/followApi";
import { LoadingCircleSpinner } from "@/shared/ui/LoadingCircleSpinner/LoadingCircleSpinner";
import { FollowList } from "@/widgets/FollowList";

const AllFollowingsPage = () => {
  const { data, isLoading } = useGetMyFollowingsQuery();

  return isLoading ? (
      <LoadingCircleSpinner className="h-[80vh]" />
    ) : data && data?.length > 0 ? (
      <FollowList data={data} title="Все подписки" />
    ) : (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center">
        <p className="max-w-100 text-[3rem] text-center font-bold">
          У вас нету подписок
        </p>
        <span className="text-[7rem]">🥺</span>
      </div>
    );
};

export default AllFollowingsPage;
