
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";



import ImageComponent from "./ImageComponent";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)



const PostCard = ({postInfo,postRef}) => {


















// console.log(postInfo,"postinfo")



    











  







  return (
    <div ref={postRef || null} className=" bg-card rounded-3xl min-w-56 border border-accent p-5 lg:p-7 w-full max-w-screen-sm flex-1">
        
      <div className="flex-between">
        <div className="flex items-center gap-3">
          {/* as of now linking to same home page /profile/post?.creator?.$id}*/}
          <Link to='/'>
            <UserAvatar></UserAvatar>
          </Link>

  
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-muted-foreground">
              {postInfo?.creator?.creatorName}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                { dayjs(postInfo?.createdAt).fromNow(true)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {postInfo?.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/$post?.$id`}
          className={ `hidden`}
        >
        <UserAvatar></UserAvatar>
        
        </Link>
      </div>

{/* as of now linking to home but in future `/posts/post?.$id`*/}
      <Link to='/'>
        <div className="small-medium lg:base-medium py-5">
          
          <ul className="flex gap-1 mt-2">
            
             { postInfo.tags.map((tag,index)=>{

return (<li key={index} className="text-light-3 small-regular">
{`#${tag}`}
</li>)

             })}
           
           
          </ul>
          <div >


    <ImageComponent
      className="rounded-md"
      src={postInfo.coverImage.url}
      imgHash={postInfo.coverImage.blurhash}
      >
    </ImageComponent>
    <p>{postInfo?.caption}</p>

    



   
 
    
          </div>
 
        </div>

     
      </Link>

    </div>
  );
};

export default PostCard;
