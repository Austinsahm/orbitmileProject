"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import Tus from "@uppy/tus";
import { supabaseBrowser } from "@/utils/supabase/browser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryProps } from "@/app/_db/action";
import { useToast } from "@/components/ui/use-toast";

interface UploaderProps {
  categories: CategoryProps[];
}

export default function Uploader({ categories }: UploaderProps) {
  const { toast } = useToast();

  // State for form fields
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const supabase = supabaseBrowser();

  const onBeforeRequest = async (req: any) => {
    const { data } = await supabase.auth.getSession();
    req.setHeader("Authorization", `Bearer ${data.session?.access_token}`);
  };

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
        maxFileSize: 5 * 1000 * 1000,
      },
    }).use(Tus, {
      endpoint:
        process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/upload/resumable",
      onBeforeRequest,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    })
  );

  uppy.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: "images",
      contentType: file.type,
    };
  });

  const handleUpload = async () => {
    if (uppy.getFiles().length !== 0) {
      const randomUUID = crypto.randomUUID(); // Generate UUID once

      // Set file metadata before uploading
      uppy.setFileMeta(uppy.getFiles()[0].id, {
        objectName: "assets/" + randomUUID + "/" + uppy.getFiles()[0].name,
      });

      const uploadResult = await uppy.upload(); // Wait for the upload to complete

      const { error } = await supabase.from("sites").insert({
        name: name,
        location: location,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        description: description,
        category: selectedCategory,
        imageUrl:
          process.env.NEXT_PUBLIC_SUPABASE_URL +
          "/storage/v1/object/public/images/assets/" +
          randomUUID +
          "/" +
          uppy.getFiles()[0].name, // Use the same UUID here
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error Uploading",
          description: error.message,
        });
      } else {
        toast({
          title: "Upload Successful",
          description: "The site has been successfully uploaded.",
        });

        // Clear form fields after successful upload
        setName("");
        setLocation("");
        setLatitude("");
        setLongitude("");
        setDescription("");
        setSelectedCategory(undefined);
        uppy.cancelAll();
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error Uploading",
        description: "Please add an image",
      });
    }
  };

  // const handleUpload = async () => {
  //   if (uppy.getFiles().length !== 0) {
  //     const randomUUID = crypto.randomUUID();

  //     // Set file metadata before uploading
  //     uppy.setFileMeta(uppy.getFiles()[0].id, {
  //       objectName: "assets/" + randomUUID + "/" + uppy.getFiles()[0].name,
  //     });

  //     uppy.upload().then(async () => {
  //       const { error } = await supabase.from("sites").insert({
  //         name: name,
  //         location: location,
  //         latitude: parseFloat(latitude),
  //         longitude: parseFloat(longitude),
  //         description: description,
  //         category: selectedCategory,
  //         imageUrl:
  //           process.env.NEXT_PUBLIC_SUPABASE_URL +
  //           "/storage/v1/object/public/images/assets/" +
  //           randomUUID +
  //           "/" +
  //           uppy.getFiles()[0].name,
  //       });
  //       if (error) {
  //         toast({
  //           variant: "destructive",
  //           title: "Error Uploading",
  //           description: error.message,
  //         });
  //       }
  //       // Clear form fields
  //       setName("");
  //       setLocation("");
  //       setLatitude("");
  //       setLongitude("");
  //       setDescription("");
  //       setSelectedCategory(undefined);
  //       uppy.cancelAll();
  //     });
  //   } else {
  //     toast({
  //       variant: "destructive",
  //       title: "Error Uploading",
  //       description: "Please adding an image",
  //     });
  //   }
  // };

  const siteUpload = (event: React.FormEvent) => {
    event.preventDefault();
    handleUpload();
  };

  const deleteAll = async () => {
    await supabase.from("sites").delete().select();

    console.log("Delete");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Site Upload</CardTitle>
          <CardDescription>Upload Site</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" method="post" onSubmit={siteUpload}>
            <div className="grid grid-cols-2 space-x-5">
              <Dashboard uppy={uppy} className="w-auto" hideUploadButton />
              <div className="space-y-5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Site Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="location">Location</Label>
                  <Textarea
                    id="location"
                    placeholder="Address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      type="number"
                      id="latitude"
                      placeholder="Latitude"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      type="number"
                      id="longitude"
                      placeholder="Longitude"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value)}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 space-y-5">
              <div className="col-span-4 grid w-full items-center gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  placeholder="Type description of the site here"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <CardFooter className="flex justify-end w-full">
              <Button type="submit" className="flex">
                Upload
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {/* <Button onClick={deleteAll}>DELETE ALL DATA</Button> */}
    </>
  );
}
