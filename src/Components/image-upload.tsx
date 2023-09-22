import { useCallback, useEffect, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { Image, Transformation } from "cloudinary-react";
import { cn } from "../lib/utils";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [uploadWidget, setUploadWidget] = useState<any>(undefined);

  useEffect(() => {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: "dnhy6fqpj",
        uploadPreset: "wkeratdy",
        sources: ["local", "url"],
        multiple: false,
        cropping: false,
        resourceType: "image",
        clientAllowedFormats: ["png", "jpeg", "jpg"],
        maxFileSize: 10000000,
        maxImageFileSize: 10000000,
        maxVideoFileSize: 10000000,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          onChange(result.info.secure_url);
        }
      }
    );

    setUploadWidget(widget);
  }, [onChange, value]);

  const handleUploadClick = useCallback(() => {
    if (uploadWidget) {
      uploadWidget.open();
    }
  }, [value, uploadWidget]);

  return (
    <div
      data-cy="image-upload"
      onClick={handleUploadClick}
      className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
    >
      <TbPhotoPlus size={50} />
      <div className="font-semibold text-lg">Click to upload</div>
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <Image className={cn("w-full h-full object-fill")} src={value}>
            <Transformation width="100" height="100" crop="fill" />
          </Image>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
