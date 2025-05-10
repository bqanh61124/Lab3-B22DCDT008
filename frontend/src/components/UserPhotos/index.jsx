import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Link as MuiLink,
} from "@mui/material";
import { format } from "date-fns";
import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

/**
 * UserPhotos – hiển thị toàn bộ ảnh + comment của một user
 * Ảnh nằm trong src/images/ => dùng require để Webpack đóng gói
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [photosData, userData] = await Promise.all([
          fetchModel(`/api/photo/photosOfUser/${userId}`),
          fetchModel(`/api/user/${userId}`)
        ]);
        setPhotos(photosData);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load photos');
      }
    };
    fetchData();
  }, [userId]);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!user || !photos) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Photos of {user.first_name} {user.last_name}
      </Typography>

      <Grid container spacing={2}>
        {photos.length > 0 ? (
          photos.map((photo) => {
            /* <-- quan trọng: load ảnh qua require() -->
               đường dẫn tương đối từ file này đến thư mục images */
            const imgSrc = require(`../../images/${photo.file_name}`);

            return (
              <Grid item key={photo._id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={imgSrc}
                    alt={photo.file_name}
                  />

                  <CardHeader
                    title={format(new Date(photo.date_time), "PPpp")}
                    sx={{
                      py: 1,
                      "& .MuiCardHeader-content": { overflow: "hidden" },
                    }}
                  />

                  <CardContent sx={{ pt: 0 }}>
                    {photo.comments?.length ? (
                      photo.comments.map((c) => (
                        <Typography variant="body2" key={c._id} sx={{ mb: 1 }}>
                          <MuiLink
                            component={RouterLink}
                            to={`/users/${c.user._id}`}
                            underline="hover"
                          >
                            <strong>
                              {c.user.first_name} {c.user.last_name}
                            </strong>
                          </MuiLink>
                          : {c.comment}
                          <br />
                          <small>{format(new Date(c.date_time), "PPpp")}</small>
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No comments yet.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography variant="body1" color="textSecondary">
            No photos available for this user.
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default UserPhotos;
