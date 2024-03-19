
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
 
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";




// import {zodResolver} from '@hookform/resolvers/zod'
import MultiFileUploader from "./MultiFileUploader";

import {  useState } from "react";
import SingleFileUploader from "./SingleFileUploader";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

import useAuth from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { TagInput } from "./ui/tag-input";
import * as Yup from 'yup';




const PostForm = ({editPostDetails}) => {
  

  const navigate = useNavigate();
  const {user}=useAuth();
  const axiosPrivate=useAxiosPrivate()

  // no default values mthrows error fo conntrol
  /* the editposttDetails is an object{
    type create or edit
    if create set default values to be empty else to edit set default values to be editpostDetails
    which are previous data that need to be updated
  }*/

  const PostFormSchema = Yup.object().shape({
    caption: Yup.string().min(1, "Caption can't be empty").max(255, 'Exceeded maximum letters'),
    coverImage: Yup.array()
      .of(Yup.mixed())
      .min(1, 'One (1) cover image is required'),
    photos: Yup.array()
      .of(Yup.mixed())
      .min(1, 'At least one (1) image is required'),
    location: Yup.string().min(1, "Location can't be empty"),
    tags: Yup.array().of(Yup.object().shape({
      text: Yup.string().min(1, "Text can't be empty"),
    })),
  });
  
  
  // const form = useForm();
  
  const form = useForm({
    resolver:yupResolver(PostFormSchema),
    
    defaultValues: {
      caption: "",
      coverImage:[],
      photos: [],
      location: "",
      tags: [],
    },
  });

  
  
  //   {
  
  
  
  



  // Query












  const [isLoading,setIsLoading]=useState(false)

  const [tags, setTags] = useState([]);

  const { setValue} = form;


  const handlePost = async (data) => {
    console.log(data)
    // console.dir(data);
    try {

setIsLoading(true);


      // Create a new FormData instance
      const formData = new FormData();
    
      // Append simple key-value pairs
      formData.append('caption', data.caption);
      formData.append('location', data.location);
    
     // Append each tag as a separate field
     data.tags.forEach((tag, index) => {
     
      formData.append(`tags[${index}]`, tag.text);
    });
      // Append coverImage as a file (assuming data.coverImage is the actual file object)
      data.coverImage.forEach((image,index)=>{
        formData.append(`coverImage[${index}]`, image);
        console.log("coverImage",image)
      })
      
    
      // Append each photo in the array (assuming data.photos is an array of file objects)
      data.photos.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo);
        console.log( photo)
      });


      formData.append('creatorID',user.userID);
    
      // Log FormData to check if it contains the expected data
      for (let [key, value] of formData.entries()) {
        console.log(`form data--${key}:`, value);
      }


      console.log(formData);

      console.log(user.userID);
      // Send FormData to the server using Axios or your preferred HTTP library
      const response = await axiosPrivate.post('/create-post',
      
         formData,
      
   {
    headers:{
      'Content-type': 'multipart/form-data',
      transformRequest: formData => formData,
    }
   }
      );
    
     
      setIsLoading(false);
      // Handle the response from the server
      console.log('Server Response:', response);
     

    
    } catch (error) {
      // Handle error
      console.error('Error creating post on the server:', error);
    }

    
   
  };





  const {  formState: { errors } } = form;

    // ACTION = CREATE

 
  
  
   
  return (
    <Form {...form }>
      <form 
        onSubmit={form.handleSubmit(handlePost)}
        className="flex flex-col gap-9 w-full  max-w-5xl">

        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start ">
              <FormLabel className="text-teal-400 font-inter">Caption</FormLabel>
        
              <FormControl>
                <Textarea
                
                  className="h-24  bg-muted custom-scrollbar "
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red font-bold" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start ">
              <FormLabel className="text-teal-400 font-inter">Add Cover Image</FormLabel>
              <FormControl >
              
                <SingleFileUploader
                  fieldChange={field.onChange}
                  
                />

              </FormControl>
              <FormMessage className="text-red font-bold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photos"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-teal-400 font-inter">Add Photos</FormLabel>
              <FormControl>
              
                <MultiFileUploader
                  fieldChange={field.onChange}
                  
                  
                />

              </FormControl>
              <FormMessage className="text-red font-bold" />
            </FormItem>
          )}
        />

     <FormField
  control={form.control}
  name="location"
  render={({ field }) => (
    <FormItem className="flex flex-col items-start ">
      <FormLabel className="text-teal-400 font-inter">Location</FormLabel>
      <FormControl>
        <Input
          type="text"
          
          placeholder="Eg:Visakhapatnam"
          className=" border-none bg-muted h-12 "
          {...field}
        />
      </FormControl>
       <FormMessage className="text-red font-bold" />
      
      
    </FormItem>
  )}
/>


            <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-teal-400 font-inter">Topics</FormLabel>
                      {tags.length<=0&&<p className="text-yellow-600 text-xs font-semibold py-4">Alteast one(1) tag must be added </p>}
                      <FormControl>
                        
                        <TagInput
                        
                          {...field}
                          placeholder="Add tags seperated by comma or press enter to add tag"
                          tags={tags}
                          className="sm:min-w-[450px] border-none bg-muted h-12"
                          animation={"fadeIn"} //fadeIn,slideIn,bounce
                          maxTags={4}
                          minTags={1}
                          showCount={true}
                          textCase={"capitalize"}
                          onChange={(e)=>{
                          console.log(e)
                          // setValue("tags", newTags);
                          }}
                       
                          
                          
                          
                          // customTagRenderer={()=>{console.log(tags)}}
                          
                          setTags={(newTags) => {
                            setTags(newTags);
                            setValue("tags", newTags);
                            

                          }}
                        />
                      </FormControl>
                      
                      
                      <FormMessage className="text-red font-bold" />
                    </FormItem>
                  )}
                />

              
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="bg-muted text-accent-foreground hover:bg-red hover:text-white"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={tags.length==0 && true || isLoading}
            className=" bg-primary hover:bg-primary text-light-1 flex gap-2 !important whitespace-nowrap"
            >
               <p>{isLoading?"posting...":"create"}</p>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
