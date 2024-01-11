"use client";
import { useModalStore } from "@/store/modalStore";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CreateModal = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { modalContent, closeModal, isModalOpen } = useModalStore();

  useEffect(() => {
    setMounted(true);
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      setMounted(false);
      document.body.style.overflowY = "";
    };
  }, [isModalOpen]);

  if (typeof window === "undefined") return <></>;

  if (!isModalOpen) return <></>;
  return mounted ? (
    <>
      {createPortal(
        <div className="fixed inset-0 bg-black z-10 opacity-65 cursor-pointer" onClick={closeModal} />,
        document.getElementById("back_drop") as HTMLElement
      )}
      {createPortal(
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-neutral-400 w-[500px] h-[500px]">
          <div>
            <button onClick={closeModal}>X</button>
          </div>
          {modalContent}
        </div>,
        document.getElementById("modal") as HTMLElement
      )}
    </>
  ) : (
    <></>
  );
};

export default CreateModal;
