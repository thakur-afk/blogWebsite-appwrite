import { useState, useEffect } from "react";
import { PostCard, Container } from "../components/index";
import appwriteService from "../appwrite/configure";

const AllPosts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return posts ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {console.log(posts)}
          {posts &&
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  ) : (
    "Loading...."
  );
};

export default AllPosts;
