import { useEffect, useState } from "react";
import { SocialLinkItem } from "./SocialLinkItem";
import { useGetSocialsQuery, useReorderSocialMutation } from "../api/socialApi";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const SocialLinkList = () => {
  const { data, isLoading } = useGetSocialsQuery();
  const [reorder, { isLoading: isLoadingReorder }] = useReorderSocialMutation();

  const items = data ?? [];

  const [socialLinks, setSocialLinks] = useState(items);

  useEffect(() => {
    setSocialLinks(items);
  }, [items]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(socialLinks);
    const [reorderItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderItem);

    const bulkUpdateData = items.map((socialLink, index) => ({
      id: socialLink.id,
      position: index,
    }));

    setSocialLinks(items);

    try {
      await reorder(bulkUpdateData).unwrap();
      toast.success("Порядок ссылок обновлен");
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      toast.error((fetchError.data as { message: string }).message);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    socialLinks && (
      <div className="mt-5 px-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="socialLinks">
            {(provided) => (
              <div
                className="flex flex-col gap-2"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {socialLinks?.map((socialLink, index) => (
                  <Draggable
                    key={socialLink.id}
                    draggableId={socialLink.id}
                    index={index}
                    isDragDisabled={isLoadingReorder}
                  >
                    {(provided) => (
                      <SocialLinkItem
                        key={socialLink.id}
                        socialLink={socialLink}
                        provider={provided}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  );
};
