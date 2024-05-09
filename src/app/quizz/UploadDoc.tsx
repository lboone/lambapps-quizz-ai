"use client";
import { useState } from "react";
import {Button} from "@/components/ui/button";

const UploadDoc = () => {
  const [document, setDocument] = useState<Blob | File | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(document);
    return;

    const formData = new FormData(e.currentTarget);
    const file = formData.get("document");
    if (file) {
    
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full">
        <label
          htmlFor="document"
          className="bg-secondary w-full flex h-60 rounded-full border-4 border-dashed border-blue-900 relative"
        >
          <div className="absolute inset-0 m-auto flex justify-center items-center">
            {document && document?.name ? document.name : "Drag your file here"}
          </div>
          <input
          type="file"
          id="document"
          className="relative block w-full h-full z-50 opacity-0"
          onChange={(e) => setDocument(e?.target?.files?.[0])}
          disabled={isLoading}
        />
        </label>
        <Button size="lg" className="mt-4 w-full" type="submit" variant="neo" disabled={isLoading}>
          {isLoading ? "Generating Quiz..." : "Generate Quizz"}
        </Button>
      </form>
    </div>
  );
};

export default UploadDoc;
