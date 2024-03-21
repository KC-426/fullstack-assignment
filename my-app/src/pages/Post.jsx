import React from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { imageListClasses } from "@mui/material";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { PiTelegramLogoDuotone  } from "react-icons/pi";


export default function Post() {
  const [data, setData] = useState([]);
  const [hitLike, setHitLike] = useState(false)

  const fetchPosts = async () => {
    try {
      const url = "http://localhost:3000/post/retrieve_post";
      const response = await axios.get(url, { withCredentials: true });
      console.log("post data==========>", response);
      setData(response.data.post);
    } catch (err) {
      console.error(err);
    }
  };

  const likePost = async() => {
    try {
      const url = "http://localhost:3000/post/like_post";
      const response = await axios.post(url, {withCredentials: true})
      
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Layout>
        <div className="main_container">
          <Grid container spacing={2}>
            {data.length > 0 &&
              data.map((ele) => (
                <Grid item xs={12} sm={4} key={ele._id}>
                  <Paper className="post-container">
                    <img
                      src={`data:image/jpeg;base64, ${ele.fileContent}`}
                      alt="Post"
                      className="post-image"
                      width={"100%"}
                    />
                    <Box sx={{ display: "flex" }}>
                      {/* <Box className="post-name-box">
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          className="post-name"
                        >
                          <b>{ele._doc.postName}</b>
                        </Typography>
                      </Box> */}
                      <div className="like_post">
                        <FaRegHeart />
                      </div>
                      <div className="share_post">
                        <PiTelegramLogoDuotone  />
                      </div>
                    </Box>
                    <div style={{ marginTop: "20px", fontSize: "22px" }}>
                      <b>About: </b>{" "}
                    </div>
                    <Typography variant="body1" gutterBottom>
                      {ele._doc.about}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </div>
      </Layout>
    </>
  );
}
