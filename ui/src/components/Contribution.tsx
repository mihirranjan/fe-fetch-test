import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { ContributionItem }  from '../interfaces/Contribution'
import { formatDateTime } from '../utils/dateUtils';

const Contribution: React.FC<ContributionItem> = ({item}) => {
  const { title, description, owner, startTime, endTime, status } = item;

  const statusStyles: Record<string, { backgroundColor: string, color: string }> = {
    Complete: { backgroundColor: 'green', color: 'white' },
    Active: { backgroundColor: 'blue', color: 'white' },
    Scheduled: { backgroundColor: 'lightgray', color: 'black' },
  };
  
  const getStatusStyle = (status: string) => statusStyles[status] || statusStyles.Scheduled;

  return (
    <Card>
        <CardContent>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" >{description}</Typography>
            <Typography variant="body2" style={{ paddingBottom: '8px' }}>
                <strong>Produced by -</strong> {owner}
            </Typography>

            <Typography variant="body2" color="textSecondary" style={{ paddingBottom: '6px' }} sx={{ fontStyle: 'italic' }}>
            Start - {formatDateTime(startTime)}{' '}
            <strong>|</strong>{' '}
            End - {formatDateTime(endTime)}
            </Typography>
            
            <Typography
                variant="body2"
                sx={{
                    ...getStatusStyle(status),
                    padding: '2px 6px',
                    borderRadius: '6px',
                    display: 'inline-block',
                }}
                >
                {status}
            </Typography>
        </CardContent>
    </Card>
  );
};

export default Contribution;
