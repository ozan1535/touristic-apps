"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "@/components/ShareYourKnowledgeClient/ShareYourKnowledgeClient.helpers";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useParams } from "next/navigation";

interface FileUploadProps {
  onFileSelect?: (file: File | null) => void;
  isLoading?: boolean;
  label?: string;
  initialPreviewUrl?: string | null;
  description?: string;
  onFileSizeError?: () => void;
  onFileTypeError?: () => void;
}

export default function ImageUpload({
  onFileSelect,
  isLoading = false,
  description = "PNG, JPEG, WebP (max 1MB)",
  initialPreviewUrl = null,
  onFileSizeError,
  onFileTypeError,
}: FileUploadProps) {
  const { locale } = useParams();
  const label = locale === "en" ? "Choose File" : "Resim Seçin";
  const uploadingText = locale === "en" ? "Uploading" : "Yükleniyor";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialPreviewUrl
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      onFileTypeError?.();
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      onFileSizeError?.();
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    onFileSelect?.(file);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onFileSelect?.(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (isLoading) {
      setPreviewUrl(null);
    }
  }, [isLoading]);
  return (
    <div className="relative">
      {previewUrl ? (
        <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-purple-400/30 bg-slate-700/20">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            loader={({ src }) => src}
            className="object-contain p-2"
          />
          <Button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-full transition-colors shadow-lg"
          >
            <X size={16} className="text-white" />
          </Button>
        </div>
      ) : (
        <>
          <Input
            ref={fileInputRef}
            id="fileUpload"
            type="file"
            accept={ALLOWED_FILE_TYPES.join(",")}
            onChange={handleChange}
            disabled={isLoading}
            className="hidden"
          />
          <Label
            htmlFor="fileUpload"
            className="flex items-center justify-center bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30 rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer"
          >
            {isLoading ? uploadingText : label}
          </Label>
          {description && (
            <p className="text-xs text-gray-400 mt-2">{description}</p>
          )}
        </>
      )}
    </div>
  );
}
