import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Image from "next/image";
import LocalHotelTwoToneIcon from '@mui/icons-material/LocalHotelTwoTone';
import BathtubTwoToneIcon from '@mui/icons-material/BathtubTwoTone';

const PropertyCard = ({ property }) => {
    return (
        <Grid item key={property.id} xs={12} sm={6} md={4} lg={4}>
            <Card sx={{ borderRadius: "15px", maxHeight: 400, width: "100%" }} >
                <CardMedia
                    component="img"
                    alt="Property Image"
                    image={property.photo}
                    sx={{ height: 200 }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {property.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {property.price} - {property.measurements}
                    </Typography>
                </CardContent>
                <CardActions sx={{ pl: 2 }}>
                    {/* <Button size="small" color="primary">
                        View Details
                    </Button> */}
                    <Box display={'flex'}>
                        <LocalHotelTwoToneIcon sx={{ mr: 1 }} />
                        <Typography>  {property.bedrooms}</Typography>
                    </Box>
                    <Box display={'flex'} >
                        <BathtubTwoToneIcon sx={{ mr: 1 }} />
                        <Typography>  {property.bathrooms}</Typography>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default PropertyCard;
