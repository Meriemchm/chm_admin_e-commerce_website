import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash, ImagePlus } from "lucide-react";

type ImageUploadProps<T extends string | string[]> = {
  disabled?: boolean;
  value: T;
  onChange: (value: T) => void;
  onRemove: (url: string) => void;
};

export function ImageUpload<T extends string | string[]>({
  disabled,
  value,
  onChange,
  onRemove,
}: ImageUploadProps<T>) {
  // toujours tableau interne pour affichage
  const [localUrls, setLocalUrls] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );

  const handleUploadSuccess = (result: any) => {
    const url = result?.info?.secure_url;
    if (!url) return;

    if (Array.isArray(value)) {
      // multi : ajoute
      setLocalUrls((prev) => {
        const updated = [...prev, url];
        // ⚠️ NE PAS appeler onChange ici
        return updated;
      });

      // onChange après le setState
      onChange([...(localUrls || []), url] as T);
    } else {
      // ✅ single : écrase
      setLocalUrls([url]);
      onChange(url as T);
    }
  };

  const handleRemove = (url: string) => {
    if (Array.isArray(value)) {
      const updated = localUrls.filter((u) => u !== url);
      setLocalUrls(updated);
      onChange(updated as T);
    } else {
      setLocalUrls([]);
      onChange("" as T);
    }
    onRemove(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        {localUrls.map((url) => (
          <div key={url} className="relative rounded-md overflow-hidden">
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                disabled={disabled}
                onClick={() => handleRemove(url)}
                variant="destructive"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="Uploaded"
              width={250}
              height={250}
              className="aspect-square rounded object-cover"
            />
          </div>
        ))}
      </div>

      <CldUploadWidget onSuccess={handleUploadSuccess} uploadPreset="npqshzo">
        {({ open }) => {
          const onClick = () => open();
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
