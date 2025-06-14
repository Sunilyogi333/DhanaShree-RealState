import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Camera, X } from "lucide-react";
import { uploadImages } from "@/utils/uploadImages ";
import axios from "axios";
import $axios from "@/lib/axios.instance";
import { toast } from "sonner";
interface ImageObject {
  id: string;
  url: string;
  type: "thumbnail" | "normal";
  propertyId?: string;
}

interface PropertyImageUpdateProps {
  initialImages: ImageObject[];
  propertyId: string;
  onDeletedImageIdsChange?: (ids: string[]) => void;
  canSubmitRef?: React.MutableRefObject<() => boolean>; // Add this
}

export default function PropertyImageUpdate({
  initialImages,
  onDeletedImageIdsChange,
  propertyId,
  canSubmitRef,
}: PropertyImageUpdateProps) {
//   const { setValue } = useFormContext();


  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [existingImages, setExistingImages] = useState<ImageObject[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
  const [hasImageChanges, setHasImageChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);



  useEffect(() => {
    if (canSubmitRef) {
      canSubmitRef.current = () => {
        if (hasImageChanges) {
          toast.error("Please save the image changes before submitting.");
          return false;
        }
        return true;
      };
    }
  }, [hasImageChanges]);
  

  useEffect(() => {
    const thumbnail = initialImages.find((img) => img.type === "thumbnail");
    const images = initialImages.filter((img) => img.type === "normal");

    if (thumbnail) {
      setThumbnailUrl(thumbnail.url);
    }

    setExistingImages(images);
  }, [initialImages]);

  useEffect(() => {
    // setValue("thumbnail", thumbnailFile ?? thumbnailUrl); // File | string
    // setValue("images", newImages.length > 0 ? newImages : undefined); // Only set if new images exist
    onDeletedImageIdsChange?.(deletedImageIds);
  }, [thumbnailFile, newImages, deletedImageIds]);

  const handleThumbnailChange = (file: File | null) => {
    if (file) {
      setHasImageChanges(true);
      setThumbnailFile(file);
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };

  const handleNewImages = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setHasImageChanges(true);
    setNewImages((prev) => [...prev, ...newFiles]);
    setNewPreviews((prev) => [
      ...prev,
      ...newFiles.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeExistingImage = (id: string) => {
    setHasImageChanges(true);
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    setDeletedImageIds((prev) => [...prev, id]);
  };

  const removeNewImage = (index: number) => {
    setHasImageChanges(true);
    const updated = [...newImages];
    updated.splice(index, 1);
    setNewImages(updated);

    const updatedPreviews = [...newPreviews];
    updatedPreviews.splice(index, 1);
    setNewPreviews(updatedPreviews);
  };
  const totalImageCount = existingImages.length + newImages.length;

  console.log("total image count", totalImageCount);

  const handleUpdate = async () => {
    try {
      setIsSubmitting(true);
      if (totalImageCount < 4) {
        toast.error("At least 4 images are required");
        setIsSubmitting(false);
        return;
      }
      const formData = new FormData();
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }
      newImages.forEach((img) => formData.append("images", img));

      const imageRes = await uploadImages(formData);
      if (!imageRes.success) {
        throw new Error("Image upload failed");
      }

      const uploaded = imageRes.images;

      const thumbnailImageId =
        uploaded.find((img: any) => img.type === "thumbnail")?.id ||
        initialImages.find((img) => img.type === "thumbnail")?.id;

      const normalImageIds = [
        ...existingImages.map((img) => img.id),
        ...uploaded
          .filter((img: any) => img.type === "normal")
          .map((img: any) => img.id),
      ];

      const payload = {
        thumbnailImageId,
        normalImageIds,
        deletedImageIds,
      };
      console.log("payload", payload);
      const res = await $axios.patch(`/image/${propertyId}`, payload);
      if (res.status === 200) {
        toast.success("Images updated!");
        setHasImageChanges(false);
      } else {
        toast.error("Image update failed");
      }
    } catch (error) {
      console.log("Update failed", error);
      toast.error("Image update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Thumbnail Upload */}
      <div>
        <label className="block font-medium mb-1">Thumbnail</label>
        <label
          htmlFor="thumbnail-upload"
          className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <Camera className="w-6 h-6 text-gray-400" />
          <span className="text-sm text-gray-500">
            Click or drop a thumbnail
          </span>
          <Input
            id="thumbnail-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
            //   setValue("thumbnail", file, { shouldValidate: true });
              handleThumbnailChange(file);
            }}
          />
        </label>

        {thumbnailUrl && (
          <div className="mt-4">
            <img
              src={thumbnailUrl}
              alt="Thumbnail preview"
              className="w-40 h-28 object-cover rounded-md"
            />
          </div>
        )}
      </div>

      {/* Images Upload */}
      <div>
        <label className="block font-medium mb-1">Property Images</label>
        <label
          htmlFor="images-upload"
          className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <Camera className="w-6 h-6 text-gray-400" />
          <span className="text-sm text-gray-500">Click or drop images</span>
          <Input
            id="images-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleNewImages(e.target.files)}
          />
        </label>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {existingImages.map((img) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.url}
                  className="h-28 w-full object-cover rounded-md"
                  alt="Existing image"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(img.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* New Images */}
        {newPreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {newPreviews.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  className="h-28 w-full object-cover rounded-md"
                  alt="Preview"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        {hasImageChanges && (
          <div className="flex justify-end">
          <button
            type="button"
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer mt-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Save the Image changes"}
          </button>
          </div>
        )}
      </div>
    </div>
  );
}
