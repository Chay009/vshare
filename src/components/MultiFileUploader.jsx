import { useCallback, useEffect, useState } from "react";
import {  useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import fileupload from '../assets/icons/file-upload.svg'


const MultiFileUploader = ({ fieldChange, mediaUrl }) => {

  const ImageDisplay = ({ fileUrl}) => {
    return (
      <div className="flex" >
        <img src={fileUrl} alt="image" className="rounded-lg" />
      </div>
    );
  };

  const convertFileToUrl = (file) => {
    console.log("Memory occupancy for converting file to URL in cpu started");
    return URL.createObjectURL(file);
  };
const [files, setFiles] = useState([]);
const [fileUrls, setFileUrls] = useState([]);
const [filesError, setFilesError] = useState(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      // Revoke object URLs when the component is unmounted
      fileUrls?.forEach((url) => URL.revokeObjectURL(url));
      console.log(`Memory cleared for ${fileUrls?.length} files by ending the file to URL process in CPU, and finally, the image is shown.`);
    };
  }, [fileUrls]);



  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0 && acceptedFiles.length <= 4) {
        console.log(`Dropping ${acceptedFiles}`)
        setFiles(acceptedFiles);
        fieldChange(acceptedFiles);
        console.log(files,"files")
        const urls = acceptedFiles.map((file) => convertFileToUrl(file));
        setFileUrls(urls);
        
        setFilesError(null);
  
      } else {
        setFiles([]);
        setFileUrls([]);
        setFilesError("At most 4 images are allowed to upload");
      }
    },
    [files,fieldChange]
  );
  

  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
   maxFiles:4,
  });


  //  the fileurl is used to show the preview of the imaga we actually send the file itself tje url is just client side showcase
  return (
    <>
      <div
        {...getRootProps()}
        className={`${
          fileUrls?.length >= 2 ? "grid lg:grid-cols-3 grid-cols-2 gap-4" : "flex items-center justify-center"
        }  bg-muted rounded-xl cursor-pointer w-full`}
      >
        <input {...getInputProps()}  className="cursor-pointer" />

        {fileUrls?.length !== 0 && fileUrls?.length<=4? (
          fileUrls?.map((eachfileurl, index) => {
            return (
              <ImageDisplay key={index} fileUrl={eachfileurl} />
            );
          })
        ) : (
          <div className="flex items-center justify-center">
            <div className="file_uploader-box justify-center">
              <div className="flex py-3">
                
                <img src={fileupload} />
              
              </div>
              <Button type="button" className="bg-muted-foreground text-muted">
                Select from Device
              </Button>
              {filesError && (
                <p className="text-rose-600 text-xs font-semibold py-4">{filesError}</p>
              )}
             {!filesError &&
             <>
             
             <h3 className="base-medium text-muted-foreground mb-2 mt-6">Drag photo here</h3>
              <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
              </> 
              }
            </div>
          </div>
        )}
      </div>
      <p className="file_uploader-label">Click or drag photo to replace</p>
    </>
  );
};

export default MultiFileUploader;


