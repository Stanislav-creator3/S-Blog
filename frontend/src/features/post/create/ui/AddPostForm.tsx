import Input from "@/shared/ui/Input/Input";
import SimpleMDE from "react-simplemde-editor";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import "easymde/dist/easymde.min.css";
import { Button } from "@/shared/ui/Button/Button";
import { Link, useNavigate, useParams } from "react-router";
import { useAppSelector } from "@/app/appStore";
import {
  useCreatePostMutation,
  useLazyGetPostQuery,
  useUpdatePostMutation,
} from "@/entities/posts/api/posts.api";
import { Tooltip } from "@/shared/ui/Tooltip/Tooltip";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const AddPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { auth } = useAppSelector((state) => state.auth);
  const [getPost] = useLazyGetPostQuery();
  const [createPost, { isLoading: isCreateLoading }] =
    useCreatePostMutation();
  const [updatePost, { isLoading: isUpdateLoading }] = useUpdatePostMutation();

  const autosavedValue = localStorage.getItem(`smde_demo`) || "";

  const [content, setContent] = useState<string>(autosavedValue);
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>();

  const [tags, setTags] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getPost(id)
        .unwrap()
        .then((res) => {
          setTitle(res.title);
          setContent(res.content);
          setTags(res.tags.join(","));
          setImageUrl(res.imageUrl);
        });
    }
  }, [getPost, id]);

  const onChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      autosave: {
        enabled: true,
        uniqueId: "demo",
        delay: 1000,
      },
    }),
    []
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const arrayTags = tags?.trim().split(" ") ?? [];
    const uniqueTags = [...new Set(arrayTags)];

    try {
      const data = id
        ? await updatePost({
            id,
            title,
            tags: uniqueTags,
            content,
            imageUrl,
          }).unwrap()
        : await createPost({
            title,
            tags: uniqueTags,
            content,
            imageUrl,
          }).unwrap();

      toast.success("Успешно");
      navigate(`/posts/${data.id}`);
      localStorage.removeItem(`smde_demo`);
      setContent("");
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      toast.error((fetchError.data as { message: string }).message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={(e) => onSubmit(e)} className="w-[80%]">
        <Input
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-bold mb-3 text-[1.25rem] placeholder:font-bold placeholder placeholder:text-[1.25rem]"
        />
        <Input
          placeholder="Теги"
          value={tags ?? []}
          onChange={(e) => setTags(e.target.value)}
          className="text-xl mb-3 placeholder:text-xl"
        />

        <Input
          placeholder="Превью"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="text-xl mb-3 placeholder:text-xl"
        />

        <SimpleMDE
          id="demo"
          value={content}
          options={options}
          onChange={onChange}
        />
        <div className="flex gap-3 mt-3">
          {auth ? (
            <Button type="submit" disabled={!auth || !title.length || !content}>
              {id ? "Сохранить" : "Создать"}
            </Button>
          ) : (
            <Tooltip
              className="text-nowrap"
              content="Чтобы создать пост необходимо авторизоваться"
              direction="top"
            >
              <Button
                type="submit"
                disabled={
                  !auth ||
                  !title.length ||
                  !content ||
                  isCreateLoading ||
                  isUpdateLoading
                }
              >
                Создать
              </Button>
            </Tooltip>
          )}

          <Link to="/">
            <Button intent="ghost">Отмена</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
