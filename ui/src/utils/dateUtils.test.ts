import { formatDateTime } from './dateUtils';

describe('formatDateTime', () => {
  it('formats a given date string into a readable format', () => {
    const inputDate = '2023-01-01T12:34:56Z';

    const expectedOutput = new Date(inputDate).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const result = formatDateTime(inputDate);
    expect(result).toBe(expectedOutput);
  });

  it('Handles invalid date strings gracefully', () => {
    const invalidDate = 'invalid-date';

    expect(formatDateTime(invalidDate)).toBe('Invalid Date');
  });
});
