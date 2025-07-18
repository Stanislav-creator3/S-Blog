import { cn } from "@/shared/utils/tw-merge";
import { Path, UseFormRegister } from "react-hook-form";
import { CiSearch } from "react-icons/ci";

interface IFormValues {
  q: string;
}

interface Props {
  onSubmit: () => void;
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  className?: string;
}

const FormSearch = ({
  className,
  onSubmit,
  label,
  register,
  required,
}: Props) => {
  return (
    <div
      className={cn(
        className,
        "w-full px-4 py-2 border-b-[2px] border-b-base-accent"
      )}
    >
      <form onSubmit={onSubmit} className="w-full flex">
        <input
          {...register(label, { required })}
          className="w-full focus:outline-none"
          type="text"
          placeholder="Поиск..."
        />
        <button type="submit" className="cursor-pointer">
          <CiSearch size={40} className="text-base-accent" />
        </button>
      </form>
    </div>
  );
};

export default FormSearch;
