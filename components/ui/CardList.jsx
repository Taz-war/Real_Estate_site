"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Box,
  Pagination,
} from "@mui/material";
import properties from "@/data/SiteLists.json";
import TuneIcon from "@mui/icons-material/Tune";

export default function ImgMediaCard() {
  const [bedroomsFilter, setBedroomsFilter] = useState("");
  const [bathroomsFilter, setBathroomsFilter] = useState("");
  const [fromPriceFilter, setFromPriceFilter] = useState("");
  const [toPriceFilter, setToPriceFilter] = useState("");
  const [addressSearch, setAddressSearch] = useState("");
  const [addressSearchTerm, setAddressSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filterSettings, setFilterSettings] = useState(false);

  useEffect(() => {
    filterProperties();
  }, [
    bedroomsFilter,
    bathroomsFilter,
    fromPriceFilter,
    toPriceFilter,
    addressSearchTerm,
  ]);

  const handleFilterChange = (event, type) => {
    const { value } = event.target;
    switch (type) {
      case "bedrooms":
        setBedroomsFilter(value);
        localStorage.setItem("bedroomsFilter", value);
        break;
      case "bathrooms":
        setBathroomsFilter(value);
        localStorage.setItem("bathroomsFilter", value);
        break;
      case "fromPrice":
        setFromPriceFilter(value);
        localStorage.setItem("fromPriceFilter", value);
        break;
      case "toPrice":
        setToPriceFilter(value);
        localStorage.setItem("toPriceFilter", value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const storedBedroomsFilter = localStorage.getItem("bedroomsFilter") || "";
    const storedBathroomsFilter = localStorage.getItem("bathroomsFilter") || "";
    const storedFromPriceFilter = localStorage.getItem("fromPriceFilter") || "";
    const storedToPriceFilter = localStorage.getItem("toPriceFilter") || "";
  
    setBedroomsFilter(storedBedroomsFilter);
    setBathroomsFilter(storedBathroomsFilter);
    setFromPriceFilter(storedFromPriceFilter);
    setToPriceFilter(storedToPriceFilter);
    
    // Trigger re-filtering of properties on component mount
    filterProperties();
  }, []);
  
  

  const handleAddressChange = (event) => {
    setAddressSearch(event.target.value.toLowerCase());
  };

  const handleSearch = () => {
    setAddressSearchTerm(addressSearch);
  };

  const filterProperties = () => {
    const results = properties.filter((property) => {
      const price = parseInt(property.price.replace(/\D/g, ""), 10); // Remove non-digits and parse
      return (
        (addressSearchTerm === "" ||
          property.location.toLowerCase().includes(addressSearchTerm)) &&
        (bedroomsFilter === "" ||
          parseInt(property.bedrooms, 10) >= parseInt(bedroomsFilter, 10)) &&
        (bathroomsFilter === "" ||
          parseInt(property.bathrooms, 10) >= parseFloat(bathroomsFilter)) &&
        (fromPriceFilter === "" || price >= parseInt(fromPriceFilter, 10)) &&
        (toPriceFilter === "" || price <= parseInt(toPriceFilter, 10))
      );
    });
    setFilteredProperties(results);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredProperties.slice(firstItemIndex, lastItemIndex);

  const pageCount = Math.ceil(filteredProperties.length / itemsPerPage);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProperties.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={9}>
          <TextField
            label="Search Address"
            variant="outlined"
            fullWidth
            size="small"
            value={addressSearch}
            onChange={handleAddressChange}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            size="small"
            onClick={handleSearch}
            sx={{ height: "40px" }}
            fullWidth
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setFilterSettings(!filterSettings)}
            sx={{ height: "40px",bgcolor:'#8B0000' }}
            fullWidth
          >
            {/* <FilterAltIcon sx={{mr:2}}/> */}
            Filter
            <TuneIcon sx={{ ml: 2 }} />
          </Button>
        </Grid>
      </Grid>
      {filterSettings && (
        <Grid container spacing={2} columns={12} mb={5}>
          <Grid item xs={3}>
            <TextField
              label="Min Bedrooms"
              variant="outlined"
              type="number"
              size="small"
              value={bedroomsFilter}
              onChange={(e) => handleFilterChange(e, "bedrooms")}
              //
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Min Bathrooms"
              variant="outlined"
              type="number"
              size="small"
              value={bathroomsFilter}
              onChange={(e) => handleFilterChange(e, "bathrooms")}
              //
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="From Price"
              variant="outlined"
              type="number"
              size="small"
              value={fromPriceFilter}
              onChange={(e) => handleFilterChange(e, "fromPrice")}
              //
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="To Price"
              variant="outlined"
              type="number"
              size="small"
              value={toPriceFilter}
              onChange={(e) => handleFilterChange(e, "toPrice")}
              //
              fullWidth
            />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={4}>
        {currentItems.map((property) => (
          <Grid item key={property.id} xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: "15px", maxHeight: 400, width: "100%" }}>
              <CardMedia
                component="img"
                alt="Property Image"
                image={property.photo}
                sx={{ height: 200 }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  fontWeight={"bolder"}
                >
                  {property.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {property.price} - {property.measurements}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" sx={{ fontWeight: "bolder" }}>
                  View Site details
                </Button>
                <Button size="small" sx={{ fontWeight: "bolder" }}>
                  Contact Agent
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          color="primary"
          // Use this prop to add some margin between the page number buttons
          sx={{ ".MuiPaginationItem-root": { margin: "0 4px" } }}
        />
      </Box>
    </Box>
  );
}
