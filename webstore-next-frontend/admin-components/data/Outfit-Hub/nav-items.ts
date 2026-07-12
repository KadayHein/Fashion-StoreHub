import { ArchiveRounded, CalendarMonthRounded, Diversity3Rounded, EventNoteRounded, GppMaybeRounded, HandshakeRounded, InventoryRounded, PolicyRounded, ReceiptLongRounded, SpaceDashboardRounded, SvgIconComponent } from '@mui/icons-material';


export interface NavItem {
  title: string;
  path: string;
  icon?: SvgIconComponent | string;
  active: boolean;
  collapsible: boolean;
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    path: 'dashboard',
    icon: SpaceDashboardRounded,
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Sales Analysis',
        path: 'sale-analysis',
        active: false,
        collapsible: false,
      },
      {
        title: 'Best Seller',
        path: 'best-seller',
        active: false,
        collapsible: false,
      }
    ],
  },
  {
    title: 'Stock Manager',
    path: 'stockmanager',
    icon: ArchiveRounded,
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'Inventory',
        path: 'inventory',
        active: false,
        collapsible: true,
        sublist: [
          {
            title: 'Stock Rotation',
            path: 'stock-rotation',
            active: false,
            collapsible: false,
          },
          {
            title: 'Stock Transfers',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Low-stock Alerts',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Short Term Age',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Stock Reports',
            path: '#!',
            active: false,
            collapsible: false,
          },
        ],
      },
      {
        title: 'Catalogs',
        path: '#!',
        active: false,
        collapsible: true,
        sublist: [
          {
            title: 'Categories',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Variants',
            path: '#!',
            active: false,
            collapsible: false,
          },
        ],
      },
      {
        title: 'New Arrivals',
        path: '#!',
        active: false,
        collapsible: false,
      },
      {
        title: 'On Trending',
        path: '#!',
        active: false,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Orderings',
    path: '#!',
    icon: InventoryRounded,
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'Pending Order',
        path: '#!',
        active: false,
        collapsible: false,
      },
      {
        title: 'Delivered Order',
        path: '#!',
        active: false,
        collapsible: false,
      },
      {
        title: 'Cancellation & Returns',
        path: '#!',
        active: false,
        collapsible: true,
        sublist: [
          {
            title: 'FAQs & Complaints',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Refund Policy',
            path: '#!',
            active: false,
            collapsible: false,
          }
        ]
      },
      {
        title: 'Voucher',
        path: '#!',
        active: false,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Event Policy',
    path: '#!',
    icon: EventNoteRounded,
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'In-store Promotions',
        path: '#!',
        active: false,
        collapsible: false
      },
      {
        title: 'Slider Landing',
        path: '#!',
        active: false,
        collapsible: false
      },
      {
        title: 'Ongoing Discounts',
        path: 'orders',
        active: false,
        collapsible: true,
        sublist: [
          {
            title: 'Flash Sales',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Time-limited Discounts',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Exclusive Discounts',
            path: '#!',
            active: false,
            collapsible: false,
          },
        ],
      },
      {
        title: 'Loyalty Plans',
        path: 'orders',
        active: false,
        collapsible: true,
        sublist: [
          {
            title: 'Membership Tiers',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Reward Points',
            path: '#!',
            active: false,
            collapsible: false,
          }
        ],
      }
    ],
  },
  {
    title: 'Client Insights',
    path: '#!',
    icon: Diversity3Rounded,
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'Purchase History',
        path: '#!',
        active: false,
        collapsible: false
      },
      {
        title: 'VIP Offers',
        path: 'orders',
        active: false,
        collapsible: false
      }
    ],
  },
  {
    title: 'Retailer Policy',
    path: '#!',
    icon: HandshakeRounded,
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'Vendor Agreement',
        path: '#!',
        active: false,
        collapsible: false
      },
      {
        title: 'Supplier Agreement',
        path: 'orders',
        active: false,
        collapsible: false
      }
    ],
  },
  {
    title: 'Transactions',
    path: 'authentication',
    icon: ReceiptLongRounded,
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Gateway Integration',
        path: 'gateway',
        active: true,
        collapsible: false,
      },
      {
        title: 'Fraudulent Transactions',
        path: 'fraudulents',
        active: true,
        collapsible: false,
      },
      {
        title: 'Revenue Reports',
        path: 'revenue-reports',
        active: true,
        collapsible: false,
      }
    ],
  },
  {
    title: 'Authentication',
    path: 'authentication',
    icon: GppMaybeRounded,
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Sign In',
        path: 'login',
        active: true,
        collapsible: false,
      },
      {
        title: 'Sign Up',
        path: 'sign-up',
        active: true,
        collapsible: false,
      },
      {
        title: 'Agent Access',
        path: 'agent-access',
        active: true,
        collapsible: false,
      }
    ],
  },
  {
    title: 'Calendar',
    path: 'calendar',
    icon: CalendarMonthRounded,
    active: false,
    collapsible: false,
  }
];

export default navItems;
