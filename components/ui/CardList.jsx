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
import FilterSettings from '@/components/subComponents/FilterSettings ';
import PropertyCard from '@/components/subComponents/PropertyCard'

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
  const [filters, setFilters] = useState([
    { id: 'bedrooms', label: 'Min Bedrooms', value: '', type: 'bedrooms' },
    { id: 'bathrooms', label: 'Min Bathrooms', value: '', type: 'bathrooms' },
    { id: 'fromPrice', label: 'From Price', value: '', type: 'fromPrice' },
    { id: 'toPrice', label: 'To Price', value: '', type: 'toPrice' }
  ]);

  useEffect(() => {
    filterProperties();
  }, [filters, addressSearchTerm]);

  const handleFilterChange = (event, type) => {
    const newFilters = filters.map(filter => ({
      ...filter,
      value: filter.type === type ? event.target.value : filter.value
    }));
    setFilters(newFilters);
    localStorage.setItem(type, event.target.value);
  };

  useEffect(() => {
    const newFilters = filters.map(filter => ({
      ...filter,
      value: localStorage.getItem(filter.type) || ''
    }));
    setFilters(newFilters);
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
      const price = parseInt(property.price.replace(/\D/g, ""), 10);
      return (
        (addressSearchTerm === "" || property.location.toLowerCase().includes(addressSearchTerm)) &&
        filters.every((filter) => {
          if (!filter.value) return true;
          if (filter.type.includes('Price')) return filter.type === 'fromPrice' ? price >= parseInt(filter.value, 10) : price <= parseInt(filter.value, 10);
          return parseInt(property[filter.type], 10) >= parseInt(filter.value, 10);
        })
      );
    });
    setFilteredProperties(results);
    setCurrentPage(1);
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
    <Box >
      <Grid container spacing={2} columns={12} >
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
            sx={{ height: "40px", bgcolor: '#8B0000', '& : hover': { bgcolor: "inherit" } }}
            fullWidth
          >
            {/* <FilterAltIcon sx={{mr:2}}/> */}
            Filter
            <TuneIcon sx={{ ml: 2 }} />
          </Button>
        </Grid>
      </Grid>
      {filterSettings && (
        <FilterSettings filters={filters} onFilterChange={handleFilterChange} />
      )}

      <Grid container spacing={4}>
        {currentItems.map((property) => (
          <PropertyCard key={property.id} property={property} />
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
