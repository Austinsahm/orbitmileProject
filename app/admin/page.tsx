// "use client";

import React from "react";
import Uploader from "./_components/Uploader";
import { getCategories } from "../_db/action";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import { supabaseBrowser } from "@/utils/supabase/browser";

export default async function adminPage() {
  const categories = await getCategories();

  // console.log(
  //   name,
  //   location,
  //   latitude,
  //   longitude,
  //   description,
  //   selectedCategory,
  //   `${
  //     process.env.NEXT_PUBLIC_SUPABASE_URL +
  //     "/storage/v1/object/public/images/assets/" +
  //     randomUUID +
  //     "/" +
  //     uppy.getFiles()[0].name
  //   }`,
  //   "They are all here"
  // );


  // const { error } = await supabase
  // .from('countries')
  // .insert({ id: 1, name: 'Denmark' })

  // Use a custom domain as the supabase URL
  // const supabase = supabaseBrowser();
  // createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // );

  // async function test() {
  //   const { error } = await supabase.from("sites").insert({
  //     name: "name",
  //     location: "location",
  //     latitude: 2.333,
  //     longitude: 4.25,
  //     description: "description",
  //   });

  //   if (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div>
      {/* <button onClick={test}>Test</button> */}
      <Uploader categories={categories ?? []} />
    </div>
  );
}
