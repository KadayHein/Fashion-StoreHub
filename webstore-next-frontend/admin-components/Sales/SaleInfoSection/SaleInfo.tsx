import { ReactElement } from 'react';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { TrendingUpRounded } from '@mui/icons-material';

type SaleInfoProps = {
  image?: string;
  title: string;
  sales: number;
  increment: number;
  date?: string;
};

const SaleInfo = ({ image, title, sales, increment, date }: SaleInfoProps): ReactElement => {
  return (
    <Card
      sx={(theme) => ({
        boxShadow: theme.shadows[4],
        width: 1,
        height: 'auto',
        borderRadius: "1rem",
        display:"flex"
      })}
    >
      <CardMedia component="img" sx={{ maxWidth: 70, maxHeight: 70, cursor: "pointer", m: 2 }} image={`/images/boardpics/${image}`} alt={title}/>
      <CardContent
        sx={{
          flex: '1 1 auto',
          padding: 1,
          ':last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="subtitle1" component="p" minWidth={100} color="text.primary">
            {title}
          </Typography>
          <Typography variant="body2" component="p" color="text.secondary">
            {date}
          </Typography>
        </Stack>
        <Typography variant="body1" component="p" color="text.secondary">
          {sales}
        </Typography>
        <Typography
          variant="body2"
          color="primary.main"
          display="flex"
          alignItems="center"
          gap={1}
          whiteSpace={'nowrap'}
        >
          <TrendingUpRounded/>
          {`+${increment}%`} last month
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SaleInfo;
