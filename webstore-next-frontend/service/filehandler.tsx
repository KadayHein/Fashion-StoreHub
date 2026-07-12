import { supabase } from "@/lib/supabaseClient";

type UploadProps = {
    file : File;
    bucket : string;
    folder? : string;
    openNoti: (status: string) => void;
}

export const uploadImage = async ({file, bucket, folder, openNoti} : UploadProps) => {
  try {
    
    const fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1);
    const fileName = `${Math.random()}.${fileExtension}`;
    const filePath = (folder ? folder + "/" : "") + fileName;

    const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath,file);

    if(error) throw(error);

    const publicUrl = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
    
    openNoti("success");
    // return publicUrl.data.publicUrl; // full http path
    return filePath;
  } catch (error) {
    openNoti("error");
  }
}