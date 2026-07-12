import { Stack } from '@mui/material';
import SaleInfo from './SaleInfo';
import { saleInfoData } from '@/admin-components/data/Outfit-Hub/sale-info-data';

const SaleInfoCards = () => {
  return (
    <Stack direction={{ md: 'row' }} justifyContent={{ sm: 'space-between' }} gap={3.75}>
      {saleInfoData.map((saleInfoDataItem) => (
        <SaleInfo
          key={saleInfoDataItem.id}
          title={saleInfoDataItem.title}
          image={saleInfoDataItem.image}
          sales={saleInfoDataItem.sales}
          increment={saleInfoDataItem.increment}
          date={saleInfoDataItem.date}
        />
      ))}
    </Stack>
  );
};

export default SaleInfoCards;
