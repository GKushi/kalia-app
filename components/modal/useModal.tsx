import { Dispatch, SetStateAction, useState } from "react";

export const useModal = (setShowTabBar: Dispatch<SetStateAction<boolean>>) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  // toggle modal
  const toggleIsShowing = () => {
    if (isShowing === true) {
      setShowTabBar(true);
    } else {
      setShowTabBar(false);
    }
    setIsShowing(!isShowing);
  };

  const modal = {
    title: title,
    isShowing: isShowing,
    toggleIsShowing: toggleIsShowing,
  };

  return [modal, setTitle, toggleIsShowing] as const;
};
