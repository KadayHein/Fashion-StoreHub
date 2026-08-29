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
        active: true,
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
    title: 'Inventory',
    path: 'inventory',
    icon: ArchiveRounded,
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'Catalog Setup',
        path: 'catalog',
        active: false,
        collapsible: false,
      },
      {
        title: 'Stock Manager',
        path: 'stockmanager',
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
            path: 'stock-transfer',
            active: false,
            collapsible: false,
          },
          {
            title: 'Low-stock Alerts',
            path: 'low-stock-alerts',
            active: false,
            collapsible: false,
          },
          {
            title: 'Stock Reports',
            path: 'stock-report',
            active: false,
            collapsible: false,
          },
        ],
      },
      {
        title: 'New Arrivals',
        path: 'newarrival',
        active: false,
        collapsible: false,
      }
    ],
  },
  {
    title: 'Orders',
    path: 'orders',
    icon: InventoryRounded,
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'Order Management',
        path: 'order-management',
        active: false,
        collapsible: false,
      },
      {
        title: 'Cancellation & Returns',
        path: 'req2cancel-return',
        active: false,
        collapsible: false
      }
    ],
  },
  {
    title: 'Event Policy',
    path: 'eventpolicy',
    icon: EventNoteRounded,
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'In-store Promotions',
        path: 'in-store-promotion',
        active: false,
        collapsible: false
      },
      {
        title: 'Event Slides',
        path: 'eventslides',
        active: false,
        collapsible: false
      },
      {
        title: 'Flash Sales',
        path: 'flashsales',
        active: false,
        collapsible: false
      }
    ],
  },
  {
    title: 'Client Insights',
    path: 'clientinsights',
    icon: Diversity3Rounded,
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'VIP Offers',
        path: '_beta',
        active: false,
        collapsible: false
      },
      {
        title: 'FAQs',
        path: 'faqs',
        active: false,
        collapsible: false
      },
      {
        title: 'Complaints',
        path: '_beta',
        active: false,
        collapsible: false
      },
      {
        title: 'Loyalty Plans',
        path: 'loyalty-plans',
        active: false,
        collapsible: true,
        sublist: [
          {
            title: 'Membership Tiers',
            path: 'membership',
            active: false,
            collapsible: false,
          },
          {
            title: 'Reward Points',
            path: 'rewardpoints',
            active: false,
            collapsible: false,
          }
        ],
      },
    ],
  },
  {
    title: "Supply Chain",
    path: "supply-chain",
    icon: HandshakeRounded,
    active: false,
    collapsible: true,
    sublist: [
      {
        title: "Supplier Management",
        path: 'suppliermgmt',
        active: false,
        collapsible: false,
      },
      {
        title: "Purchasing",
        path: 'purchasing',
        active: false,
        collapsible: false,
      },
      {
        title: "Replenishment",
        path: 'replenish',
        active: false,
        collapsible: false,
      },
      {
        title: "Procurement Analytics",
        path: 'proc-anls',
        active: false,
        collapsible: false,
      }
    ]
  },
  {
    title: 'Transactions',
    path: 'transactions',
    icon: ReceiptLongRounded,
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Payments',
        path: 'payments',
        active: true,
        collapsible: false,
      },
      {
        title: 'Payment Gateways',
        path: 'gateways',
        active: true,
        collapsible: false,
      },
      {
        title: 'Fraud & Risk',
        path: '_beta',
        active: true,
        collapsible: false,
      },
      {
        title: 'Refunds & Chargebacks',
        path: 'chargebacks',
        active: true,
        collapsible: false,
      },
      {
        title: 'Revenue Analysis',
        path: 'rev-anls',
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
