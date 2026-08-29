// import type { Metadata } from "next";
import GlobalNotiProvider from "@/base-components/system-animators/GlobalNotiProvider";
import "./globals.css";
import { URL_WEBLOGO } from "@/service/routeHandler";

// export const metadata: Metadata = {
//   title: "CC-Shopping | Home",
//   description: "Developed by Aggressive Gaday",
//   icons: {
//     icon: [
//       {
//         media : "(prefer-color-scheme: light)",
//         url : "/images/cclogo.png",
//         href : "/images/cclogo.png"
//       }
//     ]
//   }
// };



// const UPLOAD_IMAGE = gql`
//   mutation UploadImage($file: Upload!){
//     uploadProductImage(file: $file)
//   }`;

// export async function uploadImage(file:File) {
//   const { data } = await client.mutate({
//     mutation: UPLOAD_IMAGE,
//     variables: { file }
//   })
//   console.log("Uploaded Result : ", data.uploadProductImage);
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={URL_WEBLOGO}/>
        <title>GD-Store Hub.</title>
      </head>
      <body>
        <GlobalNotiProvider>
            {children}
        </GlobalNotiProvider>
      </body>
    </html>
  );
}
