import React from 'react';
import { render, screen } from '@testing-library/react';
import Contribution from './Contribution';

jest.mock('../utils/dateUtils', () => ({
  formatDateTime: jest.fn((date) => `Formatted ${date}`),
}));

describe('Contribution Component', () => {
  const mockItem = {
    "id": 101,
    "title": "Morning News Flash",
    "description": "Breaking news and updates on global events.",
    "startTime": "2024-05-27T06:00:00Z",
    "endTime": "2024-05-27T06:30:00Z",
    "owner": "Global News Network",
    "status": "Complete"
  };

  it('Render contribution data', () => {
    render(<Contribution item={mockItem} />);

    expect(screen.getByText('Morning News Flash')).toBeInTheDocument();
    expect(screen.getByText('Complete')).toBeInTheDocument();
  });

  it('Render statuses correctly with style', () => {
    const statuses = ['Complete', 'Active', 'Scheduled'] as const;
    const styles: Record<typeof statuses[number], { backgroundColor: string; color: string }> = {
        Complete: { backgroundColor: 'green', color: 'white' },
        Active: { backgroundColor: 'blue', color: 'white' },
        Scheduled: { backgroundColor: 'lightgray', color: 'black' },
    };

    statuses.forEach((status) => {
        render(<Contribution item={{ ...mockItem, status }} />);
        const statusElement = screen.getByText(status);

        expect(statusElement).toHaveStyle(`background-color: ${styles[status].backgroundColor}`);
        expect(statusElement).toHaveStyle(`color: ${styles[status].color}`);
    });
  });
});
