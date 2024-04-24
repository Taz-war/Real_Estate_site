import * as React from 'react';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import properties from '@/data/SiteLists.json'

export default function ImgMediaCard() {
  return (
    <Grid container spacing={4}>
      {properties.map((property) => (
        <Grid item key={property.id} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345,borderRadius:'15px',maxHeight:400 }}>
            <CardMedia
              component="img"
              alt="Property Image"
              // height="100"
              image={property.photo}
            />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div" fontWeight={'bolder'}>
                {property.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {property.price} - {property.measurements}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" sx={{fontWeight:'bolder'}}>View Site details</Button>
              <Button size="small" sx={{fontWeight:'bolder'}} >Contact Agent</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}