import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchVideoContributions, setSearchTerm } from './store/features/videoContributionsSlice';
import { Grid, TextField, Typography, Pagination } from '@mui/material';
import Contribution from './components/Contribution';
import { selectVideoItems, selectVideoMetadata } from './store/selectors';
import { PAGINATION } from './config';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectVideoItems);
  const { total, loading, searchTerm } = useSelector(selectVideoMetadata);
  const [page, setPage] = useState(1);
  const itemsPerPage = PAGINATION.ITEMS_PER_PAGE;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const skip = (page - 1) * itemsPerPage;
    dispatch(fetchVideoContributions({ skip, limit: itemsPerPage, searchTerm, key: 'title'  }));
  }, [dispatch, page, searchTerm]); 


  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
    setPage(1); 
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contributions
      </Typography>

      <TextField
        label="Search by Title"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '15px' }}
      />

      {loading ? (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Contribution item={item} />
            </Grid>
          ))}
        </Grid>
      )}

      <Pagination
        count={Math.ceil(total / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default App;
