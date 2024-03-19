import React, { useEffect } from 'react'
import PostCard from './PostCard'

import axios from '@/api/axios';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoaderSvg from './loaderSvg';

const UserFeed = () => {

  const LIMIT=4;
 
  const getPosts=async(queryFnParams,limit=LIMIT)=>{

    const res=await axios.get(`/posts/get-posts/?limit=${limit}&offset=${queryFnParams.pageParam}`)

    console.log(res?.data.foundPosts)

    return res.data


  }

  const {ref:postRef,inView}=useInView(
    {
      threshold:0.3
    }
  );

  const {data:posts,isFetching,error:PostsError,isError,fetchNextPage,isFetchingNextPage,hasNextPage}=useInfiniteQuery({
   

    
    //  the query key here is constant since we are displaying data on same page but with infinite scroll so it should be constant
    // to avoid refetching the data wheras in pagination we change the data based on the current page and the state of pae is soted in url so it should have dependency of pagination

   
    queryKey:["posts","infinite"],

    queryFn:getPosts,
    refetchOnWindowFocus:false,    
  //  refetchOnMount:false,
    // this value is set to pageParam of queryFnParams
    initialPageParam:0,
    staleTime:5*60*1000, // 5min
  
    
    
    getNextPageParam :(prevPageData)=>{
      console.log("getNextPageParam",prevPageData)

      return prevPageData.nextPage

      }

      
         



   
      
    

  })
  console.log(isFetching)

  useEffect(() => {
    if (inView && hasNextPage ) {
      // Fetch the next page by passing the correct page parameter
     
    console.log("fetching next page")
fetchNextPage()
     console.log(posts)
    }
  }, [inView, hasNextPage,fetchNextPage, posts]);

  
  const postList=posts?.pages?.reduce((acc,page)=>{
    return [...acc,...page?.foundPosts]
  },[])
  
  console.log(postList,"postList")
 
    

  return (
    <>
    
<div className='flex flex-col gap-3 py-4'>

{ postList?.map((eachPost,index)=>{
  // if it the last product adding ref and when it is on screen we fetch new data ,
         return postList.length==index+1
        ?<PostCard postInfo={eachPost} postRef={postRef} key={index}  isInview={inView} />
        : <PostCard postInfo={eachPost} />
 })}
</div>


      
   

  {/*  this is used for pagination but condition is only has next page and ref is removed from psotcard
  <button disabled={isFetchingNextPage} onClick={()=>{fetchNextPage()}}>{isFetchingNextPage?"loading..." :"loadMore"}</button> */}
<div className='px-5 py-3 flex items-center justify-center'>
{
  ((hasNextPage&& isFetchingNextPage)||(isFetching))&& <LoaderSvg duration={0.5}/>


  


}

 
    
     
</div>

    
    </>
  )
  }
 


export default UserFeed
