import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  TypeUploadFileSchema,
  uploadFileSchema,
} from "../schemas/profile/upload-file.schema";
import { useAppSelector } from "@/app/appStore";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal/Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  useRemoveAvatarMutation,
  useUpdateAvatarMutation,
} from "../api/profileApi";
import { AvatarSkeleton } from "@/shared/ui/Avatar/AvatarSkeleton";
import { FormWrapper } from "@/shared/ui/FormWrapper/FormWrapper";
import { Form } from "@/shared/ui/Form/Form";

const ProfileFormAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { auth } = useAppSelector((state) => state.auth);

  const [updateAvatar, { isLoading: isLoadingUpdate }] =
    useUpdateAvatarMutation();
  const [removeAvatar, { isLoading: isLoadingRemove }] =
    useRemoveAvatarMutation();

  const form = useForm<TypeUploadFileSchema>({
    resolver: zodResolver(uploadFileSchema),
    values: {
      file: auth?.avatar,
    },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = event.target.files?.[0];

    if (file) {
      formData.append("file", file);
      form.setValue("file", file);
      updateAvatar(formData);
    }
  };

  const onSubmit = async () => {};

  const handleRemoveAvatar = async () => {
    await removeAvatar().unwrap();
    setIsOpen(false);
  };

  return (
    <FormWrapper title="Изображение профиля">
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          control={form.control}
          name="file"
          render={({ field }) => (
            <div className="px-5 pb-5">
              <div className="w-full items-center space-x-6 lg:flex">
                {isLoadingUpdate || isLoadingRemove ? (
                  <AvatarSkeleton size={8} />
                ) : (
                  <Avatar
                    src={
                      field.value instanceof File
                        ? URL.createObjectURL(field.value)
                        : field.value
                    }
                    username={auth?.username ?? ""}
                    size={8}
                  />
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-x-3">
                    <input
                      className="hidden"
                      type="file"
                      ref={inputRef}
                      onChange={handleImageChange}
                    />
                    <Button
                      intent="secondary"
                      onClick={() => inputRef.current?.click()}
                      disabled={isLoadingUpdate || isLoadingRemove}
                    >
                      Загрузить
                    </Button>
                    {auth?.avatar && (
                      <Button
                        onClick={() => setIsOpen(true)}
                        intent="ghost"
                        size="lgIcon"
                        disabled={isLoadingUpdate || isLoadingRemove}
                      >
                        <FaRegTrashAlt className="color-base-accent size-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Поддерживаемые форматы: JPG, JPEG, PNG или GIF. Макс.
                    размер: 10 МБ.
                  </p>
                </div>
              </div>
            </div>
          )}
        />
      </Form>
      <Modal width="md" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Удаление аватара</Modal.Header>
        <Modal.Body>
          {" "}
          Вы уверены, что хотите удалить изображение профиля? Это действие
          нельзя будет отменить.
        </Modal.Body>
        <Modal.Footer>
          <Button intent="secondary" onClick={handleRemoveAvatar}>
            Удалить
          </Button>
          <Button onClick={() => setIsOpen(false)}> Отменить</Button>
        </Modal.Footer>
      </Modal>
    </FormWrapper>
  );
};

export default ProfileFormAvatar;
