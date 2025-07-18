export const findLikesAndBookMarks = <T extends Record<string, any>>(
  array: T[],
  userId: string,
) => {
  const result = array.map((item) => ({
    ...item,
    likedByUser: item.likes.some((like) => like.userId === userId),
    bookMarkedByUser: item.bookMarks.some(
      (bookMark) => bookMark.userId === userId,
    ),
  }));

  return result;
};
