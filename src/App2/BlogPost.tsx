import * as React  from 'react';
import {useState,useEffect,createContext} from 'react';

interface BlogContent {
  id:number;
  title:string;
  body:string;
}

function BlogPost(props:BlogContent){
  return (
    <div>
      id:{props.id}
      body:{props.body}
      title:{props.title}
    </div>
  )
}

export default BlogPost;