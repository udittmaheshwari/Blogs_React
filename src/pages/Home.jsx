import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((result) => {
      if (result && result.documents) {
        setPosts(result.documents);
      } else {
        setPosts([]); 
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No posts yet. 📭
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
              <PostCard
                {...post}
                featuredImage={post.featuredImage || null} 
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
