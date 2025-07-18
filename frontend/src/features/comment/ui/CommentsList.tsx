import { IComment } from "@/entities/posts/model/types";
import CommentListItem from "./CommentsListItem";

const CommentList = ({ data }: { data: IComment[] }) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-2xl font-bold">Комментарии</h4>
      {data.length ? (
        data.map((item) => (
          <CommentListItem
            key={item.id}
            commentId={item.id}
            userId={item.userId}
            content={item.content}
            displayName={item.user.displayName}
            avatar={item.user.avatar || ""}
            createdAt={item.createdAt}
            updateAt={item.updatedAt}
          />
        ))
      ) : (
        <p className="text-center">
          Напишите что-нибудь — ваш комментарий станет первым
        </p>
      )}
    </div>
  );
};

export default CommentList;
