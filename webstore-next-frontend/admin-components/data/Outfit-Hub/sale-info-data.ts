
interface SaleInfoData {
  id: number;
  image: string;
  title: string;
  sales: number;
  increment: number;
  date: string;
}

export const saleInfoData: SaleInfoData[] = [
  {
    id: 1,
    image: "sales.png",
    title: 'Sales',
    sales: 230220,
    increment: 55,
    date: 'Feb 2025',
  },
  {
    id: 2,
    image: "customer.png",
    title: 'Customers',
    sales: 3200,
    increment: 12,
    date: 'Feb 2025',
  },
  {
    id: 3,
    image: "revenue.png",
    title: 'Avg Revenue',
    sales: 2300,
    increment: 210,
    date: 'Feb 2025',
  },
];
