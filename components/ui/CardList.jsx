"use client"
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, TextField, Box } from '@mui/material';
import properties from '@/data/SiteLists.json';

export default function ImgMediaCard() {
  const [bedroomsFilter, setBedroomsFilter] = useState('');
  const [bathroomsFilter, setBathroomsFilter] = useState('');
  const [fromPriceFilter, setFromPriceFilter] = useState('');
  const [toPriceFilter, setToPriceFilter] = useState('');
  const [addressSearch, setAddressSearch] = useState('');
  const [addressSearchTerm, setAddressSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    filterProperties();
  }, [bedroomsFilter, bathroomsFilter, fromPriceFilter, toPriceFilter, addressSearchTerm]);

  const handleFilterChange = (event, type) => {
    const { value } = event.target;
    switch (type) {
      case 'bedrooms':
        setBedroomsFilter(value);
        break;
      case 'bathrooms':
        setBathroomsFilter(value);
        break;
      case 'fromPrice':
        setFromPriceFilter(value);
        break;
      case 'toPrice':
        setToPriceFilter(value);
        break;
      default:
        break;
    }
  };

  const handleAddressChange = (event) => {
    setAddressSearch(event.target.value.toLowerCase());
  };

  const handleSearch = () => {
    setAddressSearchTerm(addressSearch);
  };

  const filterProperties = () => {
    const results = properties.filter(property => {
      const price = parseInt(property.price.replace(/\D/g, ''), 10); // Remove non-digits and parse
      return (
        (addressSearchTerm === '' || property.location.toLowerCase().includes(addressSearchTerm)) &&
        (bedroomsFilter === '' || parseInt(property.bedrooms, 10) >= parseInt(bedroomsFilter, 10)) &&
        (bathroomsFilter === '' || parseInt(property.bathrooms, 10) >= parseFloat(bathroomsFilter)) &&
        (fromPriceFilter === '' || price >= parseInt(fromPriceFilter, 10)) &&
        (toPriceFilter === '' || price <= parseInt(toPriceFilter, 10))
      );
    });
    setFilteredProperties(results);
  };

  return (
    <Box>
      <Grid container spacing={4} columns={12} mb={5}>
        <Grid item xs={10}>
          <TextField
            label="Search Address"
            variant="outlined"
            fullWidth
            value={addressSearch}
            onChange={handleAddressChange}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={handleSearch} sx={{ height: '56px' }} fullWidth>Search Address</Button>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Min Bedrooms"
            variant="outlined"
            type="number"
            value={bedroomsFilter}
            onChange={(e) => handleFilterChange(e, 'bedrooms')}
            // 
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Min Bathrooms"
            variant="outlined"
            type="number"
            value={bathroomsFilter}
            onChange={(e) => handleFilterChange(e, 'bathrooms')}
            // 
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="From Price"
            variant="outlined"
            type="number"
            value={fromPriceFilter}
            onChange={(e) => handleFilterChange(e, 'fromPrice')}
            // 
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="To Price"
            variant="outlined"
            type="number"
            value={toPriceFilter}
            onChange={(e) => handleFilterChange(e, 'toPrice')}
            // 
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {filteredProperties.map((property) => (
          <Grid item key={property.id} xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '15px', maxHeight: 400, width: "100%" }} >
              <CardMedia
                component="img"
                alt="Property Image"
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
                <Button size="small" sx={{ fontWeight: 'bolder' }}>View Site details</Button>
                <Button size="small" sx={{ fontWeight: 'bolder' }}>Contact Agent</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
