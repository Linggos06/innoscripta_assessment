import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews, selectNews } from "../config/store/newsSlice";
import { generateUrl } from "../config/generateUrl";
import Wrapper from "../layout/Wrapper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import "./NewsFeed.scss";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { news, loading, query } = useSelector(selectNews);

  useEffect(() => {
    if (!query) {
      const url = generateUrl("home");
      dispatch(fetchNews(url));
    }
  }, [query]);

  if (loading === "pending") {
    return (
      <Wrapper>
        <div className="state_wrapper">
          <LinearProgress />
        </div>
      </Wrapper>
    );
  }
  if (news.length === 0) {
    return (
      <Wrapper>
        <div className="state_wrapper">
          <Typography align="center">
            Sorry, no matching results found
          </Typography>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
        {news.map(({ title, url, author, publishedAt }, index) => (
          <Grid item key={index} xs={12} sm={6}>
            <Card className="card">
              <CardActionArea href={url} target="_blank">
                <CardContent>
                  <Typography
                    className="source"
                    color="text.secondary"
                    gutterBottom
                  >
                    {author}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {title}
                  </Typography>
                </CardContent>
                <CardActions className="card_actions">
                  <Chip
                    className="view-story_button"
                    label="View full story"
                    variant="outlined"
                    clickable
                    size="small"
                  />
                  <Typography className="date" variant="caption">
                    {new Date(publishedAt).toDateString()}
                  </Typography>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default NewsFeed;
