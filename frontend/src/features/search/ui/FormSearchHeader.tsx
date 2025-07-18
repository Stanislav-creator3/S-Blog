import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { cn } from "@/shared/utils/tw-merge";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";

const FormSearchHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      q: "",
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.getValues("q")) {
      return toast.error("Поле не может быть пустым", {
        position: "top-right",
      });
    }
    const q = form.getValues("q").toLocaleLowerCase().trim();
    navigate(`/search?q=${q}`);
    form.reset();
    setIsOpen(false);
  };

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-1 transition-[width] duration-400 ease-in-out",
        isOpen ? "w-[300px] h-12 glass" : "w-12 h-12 glass"
      )}
    >
      <form
        className={cn("relative flex", isOpen ? "visible w-full" : "invisible w-0")}
        onSubmit={(e) => onSubmit(e)}
      >
        <button
          type="submit"
          className={cn(
            "cursor-pointer w-12 h-12 flex items-center opacity-0 transition-[opacity,visibility] ease-in-out",
            isOpen
              ? "visible opacity-100 duration-300"
              : "invisible opacity-0 duration-300"
          )}
        >
          <CiSearch size={30} className="text-base-accent" />
        </button>
        <Controller
          name="q"
          control={form.control}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={cn(
                "bg-none outline-none w-full p-2  transition-opacity ease-in-out",
                isOpen ? "opacity-100 duration-300" : "opacity-0 duration-300"
              )}
            />
          )}
        />
      </form>
      <button
        onClick={(e) => onClick(e)}
        className={cn(
          "absolute right-0",
          "w-12 h-12 cursor-pointer flex items-center justify-center"
        )}
      >
        {isOpen ? (
          <IoClose
            size={30}
            className={cn(
              "text-base-accent transition-opacity ease-in-out",
              isOpen
                ? "visible opacity-100 duration-300"
                : "invisible opacity-0 duration-200"
            )}
          />
        ) : (
          <CiSearch size={30} className="text-base-accent" />
        )}
      </button>
    </div>
  );
};

export default FormSearchHeader;
