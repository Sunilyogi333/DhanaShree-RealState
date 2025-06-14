import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface PropertyImageUploadProps {
  form: UseFormReturn<any>;
  initialThumbnailUrl?: string;
  initialImageUrls?: {}[];
}

export const PropertyImageUpload: React.FC<PropertyImageUploadProps> = ({
  form,
  initialThumbnailUrl,
  initialImageUrls = [],
}) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   if (initialThumbnailUrl) {
  //     setThumbnailUrl(initialThumbnailUrl);
  //     form.setValue("thumbnail", initialThumbnailUrl);
  //   }

  //   if (initialImageUrls?.length) {
  //     setPreviewUrls(initialImageUrls);
  //     form.setValue("images", initialImageUrls);
  //   }
  // }, [initialThumbnailUrl, initialImageUrls]);

  const handleThumbnailChange = (file: File | null) => {
    if (file) {
      form.setValue("thumbnail", file);
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    form.setValue("thumbnail", null);
    setThumbnailUrl(null);
  };

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files);
      const existingImages = form.getValues("images") || [];
      const updatedImages = [...existingImages, ...newImages];

      console.log("Files added:", newImages.length);
      console.log("Total files now:", updatedImages.length);

      form.setValue("images", updatedImages, { shouldValidate: true });
      // form.setValue("images", [...form.getValues("images"), ...newImages]);
      setPreviewUrls([
        ...previewUrls,
        ...newImages.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...form.getValues("images")];
    updatedImages.splice(index, 1);
    form.setValue("images", updatedImages);

    const updatedUrls = [...previewUrls];
    updatedUrls.splice(index, 1);
    setPreviewUrls(updatedUrls);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="thumbnail"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Camera size={16} /> Upload Thumbnail
            </FormLabel>
            <FormControl>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="thumbnail-file"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      1 thumbnail (MAX. 5MB)
                    </p>
                  </div>
                  <Input
                    id="thumbnail-file"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file); // Connect it to the form
                      handleThumbnailChange(file);
                    }}
                  />
                </label>
              </div>
            </FormControl>
            <FormMessage />

            {thumbnailUrl && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="relative group">
                    <img
                      src={thumbnailUrl}
                      alt="Thumbnail Preview"
                      className="h-32 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeThumbnail()}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Camera size={16} /> Upload Images
            </FormLabel>
            <FormControl>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG (MAX. 5MB each)
                    </p>
                  </div>
                  <Input
                    id="dropzone-file"
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                    onChange={(e) => {
                      // field.onChange(e.target.files);
                      handleImageChange(e.target.files);
                    }}
                  />
                </label>
              </div>
            </FormControl>
            <FormMessage />

            {previewUrls.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index}`}
                        className="h-32 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};
