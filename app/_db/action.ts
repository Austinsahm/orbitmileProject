"use server";

import { createClient } from "@/utils/supabase/server";

export interface SitesProps {
  id: string;
  location: string;
  name: string;
  created_at: Date;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  category: string;
  updatedAt: Date;
}

export interface CategoryProps {
  id: string;
  category: string;
}

export async function getCategories() {
  const supabase = createClient();

  const { data: category } = await supabase
    .from("category")
    .select("id, category");
  //   console.log(category);

  return category as CategoryProps[];
}

export async function getSites() {
  const supabase = createClient();

  const { data: sites } = await supabase.from("sites").select();
  //   console.log(sites);

  return sites as SitesProps[];
}
