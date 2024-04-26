export const filterProperties = (filters,properties,addressSearchTerm,setFilteredProperties, setCurrentPage) => {
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
