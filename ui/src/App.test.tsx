import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

import { fetchVideoContributions, setSearchTerm } from './store/features/videoContributionsSlice';

jest.mock('./store/features/videoContributionsSlice', () => ({
  fetchVideoContributions: jest.fn(),
  setSearchTerm: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Home Page: App Component', () => {
  let store = mockStore({
    videoContributions: {
      items: [],
      total: 0,
      loading: false,
      searchTerm: '',
    },
  });

  beforeEach(() => {
    store = mockStore({
      videoContributions: {
        items: [
          { id: 1, title: 'Contribution 1', description: 'Desc 1', owner: 'User 1', startTime: '2023-01-01', endTime: '2023-01-02' },
          { id: 2, title: 'Contribution 2', description: 'Desc 2', owner: 'User 2', startTime: '2023-01-03', endTime: '2023-01-04' },
          { id: 3, title: 'Contribution 3', description: 'Desc 1', owner: 'User 1', startTime: '2023-01-01', endTime: '2023-01-02' },
          { id: 4, title: 'Contribution 4', description: 'Desc 2', owner: 'User 2', startTime: '2023-01-03', endTime: '2023-01-04' },
          { id: 5, title: 'Contribution 5', description: 'Desc 1', owner: 'User 1', startTime: '2023-01-01', endTime: '2023-01-02' },
          { id: 6, title: 'Contribution 6', description: 'Desc 2', owner: 'User 2', startTime: '2023-01-03', endTime: '2023-01-04' },
          { id: 7, title: 'Contribution 7', description: 'Desc 1', owner: 'User 1', startTime: '2023-01-01', endTime: '2023-01-02' },
          { id: 8, title: 'Contribution 8', description: 'Desc 2', owner: 'User 2', startTime: '2023-01-03', endTime: '2023-01-04' },
          { id: 9, title: 'Contribution 9', description: 'Desc 1', owner: 'User 1', startTime: '2023-01-01', endTime: '2023-01-02' },
          { id: 10, title: 'Contribution 10', description: 'Desc 2', owner: 'User 2', startTime: '2023-01-03', endTime: '2023-01-04' },
          { id: 11, title: 'Contribution 11', description: 'Desc 1', owner: 'User 1', startTime: '2023-01-01', endTime: '2023-01-02' },
          { id: 12, title: 'Contribution 12', description: 'Desc 2', owner: 'User 2', startTime: '2023-01-03', endTime: '2023-01-04' },
          { id: 13, title: 'Contribution 13', description: 'Desc 1', owner: 'User 1', startTime: '2023-01-01', endTime: '2023-01-02' },
          { id: 14, title: 'Contribution 14', description: 'Desc 2', owner: 'User 2', startTime: '2023-01-03', endTime: '2023-01-04' },
          { id: 15, title: 'Contribution 15', description: 'Desc 1', owner: 'User 1', startTime: '2023-01-01', endTime: '2023-01-02' },
          { id: 16, title: 'Contribution 16', description: 'Desc 2', owner: 'User 2', startTime: '2023-01-03', endTime: '2023-01-04' },
          { id: 17, title: 'Contribution 17', description: 'Desc 1', owner: 'User 1', startTime: '2023-01-01', endTime: '2023-01-02' },
          { id: 18, title: 'Contribution 18', description: 'Desc 2', owner: 'User 2', startTime: '2023-01-03', endTime: '2023-01-04' },
          ],
        total: 17,
        loading: false,
        searchTerm: '',
      },
    });

    store.dispatch = jest.fn();
  });

  it('Render the home page without any crash', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Contributions')).toBeInTheDocument();
    expect(screen.getByLabelText('Search by Title')).toBeInTheDocument();
    expect(screen.getByText('Contribution 1')).toBeInTheDocument();
    expect(screen.getByText('Contribution 2')).toBeInTheDocument();
  });

  it('Render loading text when waiting for response(loading is true) from api', () => {
    store = mockStore({
      videoContributions: {
        items: [],
        total: 0,
        loading: true,
        searchTerm: '',
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Render pagination with correct number of pages', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('Dispatches setSearchTerm() when search input change', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const searchInput = screen.getByLabelText('Search by Title');
    fireEvent.change(searchInput, { target: { value: 'First' } });

    expect(setSearchTerm).toHaveBeenCalledWith('First');
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('Dispatches fetchVideoContributions() when page navigation number clicked', async() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const nextPageButton = screen.getByRole('button', { name: /2/i });
    fireEvent.click(nextPageButton);

    expect(fetchVideoContributions).toHaveBeenCalledWith({ skip: 14, limit: 14, searchTerm: '', key: 'title' });
    expect(store.dispatch).toHaveBeenCalled();
  });
});
