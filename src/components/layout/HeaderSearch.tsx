"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";

type Input = {
  searchWord: string;
};

const HeaderSearch = () => {
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors }
  } = useForm<Input>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Input> = (data) => {
    if (data.searchWord === undefined) {
      alert("검색어를 입력해주세요.");
      return;
    }
    resetField("searchWord");

    router.push(`/search/${data.searchWord}`);
  };

  return (
    <div className="max-w-[392px] w-full h-[32px] border border-point rounded-full p-1 ">
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="mx-2 flex-1 w-full focus:outline-none"
          {...register("searchWord", { required: true })}
        />
        <button className="inline cursor-pointer " type="submit">
          <AiOutlineSearch className="inline cursor-pointer" size="22" color="#3074F0" />
        </button>
      </form>
    </div>
  );
};

export default HeaderSearch;
