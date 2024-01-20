import CardLists from "@/components/CardLists";
import Section from "@/components/layout/Section";
import { supabase } from "@/service/supabase";
import { ExtendReview, ProductProperties, Review } from "@/types/db";
import { Json } from "@/types/supabase";
import getPath from "@/utils/getPath";
import Link from "next/link";

interface FixedReview extends Review {
  id: string;
  store: { name: string; region: { region: string } };
  userinfo: { username: string; avatar_url: string };
  product: { name: string; thumbnail: string; category_id: string };
  url: string[];
}

const getProductData = async (): Promise<ProductProperties[]> => {
  const { domain } = getPath();
  const result = await fetch(`http://${domain}/api/product`, { method: "GET" });
  if (!result.ok) {
    throw new Error("Product 데이터 불러오기 실패");
  }
  return result.json();
};

const getReviewData = async (): Promise<FixedReview[]> => {
  const { domain } = getPath();
  const { data, error } = await supabase.from("fixed_review").select("*, review");
  if (error) {
    throw new Error("Review 데이터 불러오기 실패");
  }
  return data;
};

const Home = async () => {
  const items = await getProductData();
  const reviews = await getReviewData();

  const discountFilteredItems = items
    .filter((item) => item.percentage_off !== 0)
    .sort((a: ProductProperties, b: ProductProperties) => {
      if (a.percentage_off! < b.percentage_off!) {
        return 1;
      }
      if (a.percentage_off! > b.percentage_off!) {
        return -1;
      }
      return 0;
    })
    .slice(0, 8);

  const viewSortedItems = items
    .sort((a: ProductProperties, b: ProductProperties) => {
      if (a.view! < b.view!) {
        return 1;
      }
      if (a.view! > b.view!) {
        return -1;
      }
      return 0;
    })
    .slice(0, 8);

  return (
    <div className="flex flex-col ">
      <div className=" bg-slate-300 w-[1200px] h-[450px] mb-[200px]">케러셀</div>
      <Section title="욜루오션 BIG SALE 👍" isCenter={false}>
        <CardLists cardLists={discountFilteredItems} />
      </Section>
      <div className="bg-slate-300 w-[1200px] h-[280px] mb-[200px]">베너</div>
      <Section title="욜루오션 HOT 아이템 ❤️" isCenter={false}>
        <CardLists cardLists={viewSortedItems} />
      </Section>
      <div className="bg-slate-300 w-[1200px] h-[280px] mb-[200px]">베너</div>
      <Section title="재밌게 즐기구 돌아왔션 ✌️" isCenter={false}>
        <div className="grid grid-cols-4 gap-[13px]">
          {reviews.map((review) => (
            <Link key={review.id} href={`/category/${review.product.category_id}/${review.product_id}#후기`}>
              <img className="w-[291px] h-[291px]" src={review.url[0]} />
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Home;
