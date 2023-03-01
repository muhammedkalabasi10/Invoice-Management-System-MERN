import React from 'react'
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardHeader, Grid } from "@mui/material";

export default function CardItem({width, title, avatar, value, status}) {
  return (
        <Grid item xs={4} md={4}>
    <Card sx={{ maxWidth:width, display:"inline-block" }}>
        <CardActionArea>
          <CardHeader
            sx={{ backgroundColor: status==="Positive"?"#B5F1CC":"#FCC2FC" }}
            title={
              <Typography
                fontFamily="Lato"
                gutterBottom
                variant="h6"
                component="div"
              >
                {title}
              </Typography>
            }
            avatar={avatar}
          />
          <Typography
            variant="h5"
            paddingTop="1rem"
            paddingBottom="1rem"
            color="text.primary"
            textAlign="center"
            backgroundColor="#E5FDD1"
          >
            {value}
          </Typography>
        </CardActionArea>
      </Card>
      </Grid>
  )
}
