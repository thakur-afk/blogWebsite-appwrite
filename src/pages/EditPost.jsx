import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index";
import appwriteService from "../appwrite/configure";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [posts, setPosts] = useState(null);
  const { slug } = useParams();
  console.log(slug);
  const navigate = useNavigate();

  useEffect(() => {
    async function getP() {
      if (slug) {
        const response = await appwriteService.getPost(slug);
        if (response) {
          console.log(response);
          setPosts(response);
        }
      } else {
        navigate("/");
      }
    }
    getP();
  }, [slug, navigate]);

  return posts ? (
    <div className="py-8">
      <Container>
        <PostForm post={posts} />
        {console.log(posts)}
      </Container>
    </div>
  ) : null;
};

export default EditPost;
