import { motion } from "motion/react";
import MenuItem, { itemVariants } from "./MenuItem";
import { cn } from "@/shared/utils/tw-merge";
import { CiUser } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useLogoutMutation } from "@/entities/auth/api/authApi";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { useState } from "react";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { useAppSelector } from "@/app/appStore";

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation = ({ isOpen, onClose }: Props) => {
  const username = useAppSelector((state) => state.auth.auth?.username);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [logout] = useLogoutMutation();

  const onClickLogout = () => {
    logout({ logout: true });
    setIsOpenModal(true);
  };

  const items = [
    {
      href: `/profile/${username}`,
      icon: CiUser,
      text: "Профиль",
    },

    {
      href: "/dashboard/settings",
      icon: IoSettingsOutline,
      text: "Настройки",
    },
    {
      href: "/bookmarks",
      icon: PiBookmarkSimpleLight,
      text: "Закладки",
    },
  ];
  return (
    <>
      <motion.ul
        className={cn(
          isOpen ? "visible" : "invisible ",
          "list-none transition-visibility duration-300 z-5 p-4 m-0 absolute top-20 right-0 w-55"
        )}
        variants={navVariants}
      >
        {items.map((item, i) => (
          <MenuItem
            onClose={onClose}
            href={item.href}
            Icon={item.icon}
            text={item.text}
            key={i}
          />
        ))}
        <li className="list-none p-0 mb-5 cursor-pointer">
          <motion.button
            onClick={() => setIsOpenModal(true)}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer flex w-full items-center justify-start"
          >
            <span className="glass mr-2 bg-[rgba(255,255,255,0.6)]">
              <CiLogout size={40} className="text-red-500 p-1" />
            </span>

            <p className="flex-1 text-2xl text-center bg-[rgba(225,18,18,1)] p-1 glass">
              Выйти
            </p>
          </motion.button>
        </li>
      </motion.ul>
      <Modal
        width="md"
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <Modal.Header>Выйти</Modal.Header>
        <Modal.Body>{`Вы действительно хотите выйти?`}</Modal.Body>
        <Modal.Footer>
          <Button onClick={onClickLogout} intent="ghost">
            Да
          </Button>
          <Button onClick={() => setIsOpenModal(false)}>Нет</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navigation;
