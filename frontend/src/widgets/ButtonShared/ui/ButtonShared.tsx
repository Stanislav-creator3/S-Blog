import { motion, useAnimate } from "motion/react";
import { useState } from "react";
import { GoShare } from "react-icons/go";
import { FaTelegramPlane } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiVkFill } from "react-icons/ri";
import { FaOdnoklassnikiSquare } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { useLocation } from "react-router";
import { url } from "@/shared/constants";

interface Props {
  text?: string;
}

const listVariants = {
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
  hidden: { opacity: 0, x: 100 },
};

const ButtonShared = ({ text = "" }: Props) => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  const SocialLink = [
    {
      name: "Telegram",
      link: `https://t.me/share/url?url=${
        url + location.pathname
      }&text=${text}`,
      icon: FaTelegramPlane,
    },
    {
      name: "Vk",
      link: `https://vk.com/share.php?url=${
        url + location.pathname
      }&title=${text}`,
      icon: RiVkFill,
    },
    {
      name: "Max",
      link: `https://connect.ok.ru/offer?url=${
        url + location.pathname
      }&title=${text}`,
      icon: FaOdnoklassnikiSquare,
    },
    {
      name: "WhatsApp",
      link: `https://wa.me/whatsappphonenumber/?text=${
        url + location.pathname
      }`,
      icon: FaWhatsapp,
    },
  ];

  const [scope, animate] = useAnimate();
  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOpen((prev) => !prev);

    animate([
      [scope.current, { scale: 0.6, opacity: 0 }, { duration: 0.2 }],
      [scope.current, { scale: 1, opacity: 1 }, { duration: 0.2 }],
    ]);
  };

  return (
    <div className="relative w-55">
      <motion.div
        ref={ref}
        className="absolute glass top-0 right-0 flex gap-4 items-center justify-end p-1 z-2"
        animate={{
          width: isOpen ? "100%" : 40,
          scale: isOpen ? 1.1 : 1,
        }}
      >
        {isOpen && (
          <ul className="flex gap-3">
            {SocialLink.map((item, index) => (
              <motion.li
                variants={listVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  className="w-7.5 h-7.5 flex items-center justify-center"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.name}
                >
                  <item.icon
                    className="cursor-pointer text-base-accent"
                    size={30}
                  />
                </motion.a>
              </motion.li>
            ))}
          </ul>
        )}

        <motion.span ref={scope} onClick={handleLike}>
          {isOpen ? (
            <IoMdClose className="cursor-pointer " size={30} />
          ) : (
            <GoShare className="cursor-pointer text-base-accent" size={30} />
          )}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default ButtonShared;
