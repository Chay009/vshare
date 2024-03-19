import PostForm from "./PostForm";
import { ImagePlus } from "lucide-react";





const CreatePost = () => {
  
 
  return (
    
    <div className="flex flex-1 ">
      
      <div className="common-container overflow-hidden">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <ImagePlus></ImagePlus>
        
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        <PostForm />
       
     

      </div>
    </div>
  );
};

export default CreatePost;
