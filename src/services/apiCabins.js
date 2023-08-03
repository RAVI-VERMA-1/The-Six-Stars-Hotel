import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    // console.error(error);
    throw new Error("Couldn't delete Cabin");
  }
}

export async function createEditCabin(newCabin, id) {
  // console.log(newCabin);
  // https://qtfifrbvjxyihxiwehfm.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");

  // A) .To create the new Cabin --->
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) To Edit a new Cabin----->
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();
  // console.log(data);
  if (error) {
    // console.error(error);

    throw new Error("Couldn't create Cabin");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error("Couldn't delete Cabin");
  }

  return data;
}
