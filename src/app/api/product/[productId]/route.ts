import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { productId: string } }) => {
  const {
    params: { productId }
  } = context;

  let { data: post, error } = await supabase
    .from("product")
    .select("*,category!inner(category_name),stock!inner(count,store(address,name))")
    .eq("id", productId);

  console.log(post);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(post![0]);
};
