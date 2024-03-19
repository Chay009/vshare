import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImageDisplay = ({ fileUrl }) => {
  return (
    <div className="flex">
      <img src={fileUrl} alt="image" className="rounded-lg" />
    </div>
  );
};

const SingleFileUploader = ({ fieldChange }) => {
  const convertFileToUrl = (file) => 
  { console.log("Memory occupancy for converting file to URL in cpu started");
  return  URL.createObjectURL(file)};

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      // Revoke object URLs when the component is unmounted
      URL.revokeObjectURL(fileUrl)
      console.log("Memory cleared by ending the file to URL process in CPU, and finally, the image is shown.");
    };
  }, [file]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const firstFile = acceptedFiles[0];
      console.log(acceptedFiles,"single accepted file")
      setFile(firstFile);
      fieldChange(acceptedFiles);
      console.log([firstFile])
      setFileUrl(convertFileToUrl(firstFile));
      setFileError(null);
    } else {
      setFile(null);
      setFileUrl(null);
      setFileError("Please upload a single image as the cover photo");
    }
  }, [file,fieldChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    maxFiles: 1, // Limit to one file
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="flex items-center justify-center w-full bg-muted rounded-xl cursor-pointer"
      >
        <input {...getInputProps()} className="cursor-pointer" />

        {file && fileUrl ? (
          <ImageDisplay fileUrl={fileUrl} />
        ) : (
          <div className="flex items-center justify-center">
            <div className="file_uploader-box justify-center">
              <Image className="w-20 h-20 lg:w-36 lg:h-36 text-accent-foreground" />
              <Button type="button" className="bg-muted-foreground text-muted">
                Select from Device
              </Button>
              {fileError && (
                <p className="text-rose-600 text-xs font-semibold py-4">{fileError}</p>
              )}
              {!fileError && (
                <>
                 <h3 className="base-medium text-muted-foreground mb-2 mt-6">Drag photo here</h3>
                  <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleFileUploader;
