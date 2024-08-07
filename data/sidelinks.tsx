import {
    IconApps,
    IconBarrierBlock,
    IconBoxSeam,
    IconChartHistogram,
    IconChecklist,
    IconComponents,
    IconError404,
    IconExclamationCircle,
    IconHexagonNumber1,
    IconHexagonNumber2,
    IconHexagonNumber3,
    IconHexagonNumber4,
    IconHexagonNumber5,
    IconLayoutDashboard,
    IconMessages,
    IconMeteor,
    IconRocket,
    IconRouteAltLeft,
    IconServerOff,
    IconSettings,
    IconTruck,
    IconUserShield,
    IconUsers,
  } from '@tabler/icons-react'
import { Gauge } from 'lucide-react'
  
  export interface NavLink {
    title: string
    label?: string
    href: string
    icon: JSX.Element
  }
  
  export interface SideLink extends NavLink {
    sub?: NavLink[]
  }
  
  export const sidelinks: SideLink[] = [
    {
      title: 'Dashboard',
      label: '',
      href: '/dashboard',
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: 'Tasks',
      label: '3',
      href: '/dashboard/tasks',
      icon: <IconChecklist size={18} />,
    },
    {
      title: 'Performance',
      label: '9',
      href: '/dashboard/performance',
      sub: [
        {
          title: 'Leaderboards',
          href: '/dashboard/leaderboards',
          icon: <Gauge size={18} />
        },
        {
          title: 'Sales / Daily',
          href: '/dashboard/leaderboards',
          icon: <Gauge size={18} />
        },
        {
          title: 'Sales / Weekly',
          href: '/dashboard/leaderboards',
          icon: <Gauge size={18} />
        },
        {
          title: 'Sales / Monthly',
          href: '/dashboard/leaderboards',
          icon: <Gauge size={18} />
        }
      ],
      icon: <IconMessages size={18} />,
    },
    {
      title: 'Projects',
      label: '6',
      href: '/projects',
      icon: <IconApps size={18} />,
    },
    {
      title: 'Authentication',
      label: '',
      href: '',
      icon: <IconUserShield size={18} />,
      sub: [
        {
          title: 'Sign In (email + password)',
          label: '',
          href: '/sign-in',
          icon: <IconHexagonNumber1 size={18} />,
        },
        {
          title: 'Sign In (Box)',
          label: '',
          href: '/sign-in-2',
          icon: <IconHexagonNumber2 size={18} />,
        },
        {
          title: 'Sign Up',
          label: '',
          href: '/sign-up',
          icon: <IconHexagonNumber3 size={18} />,
        },
        {
          title: 'Forgot Password',
          label: '',
          href: '/forgot-password',
          icon: <IconHexagonNumber4 size={18} />,
        },
        {
          title: 'OTP',
          label: '',
          href: '/otp',
          icon: <IconHexagonNumber5 size={18} />,
        },
      ],
    },
    {
      title: 'Users',
      label: '',
      href: '/users',
      icon: <IconUsers size={18} />,
    },
    {
      title: 'Requests',
      label: '10',
      href: '/requests',
      icon: <IconRouteAltLeft size={18} />,
      sub: [
        {
          title: 'Trucks',
          label: '9',
          href: '/trucks',
          icon: <IconTruck size={18} />,
        },
        {
          title: 'Cargos',
          label: '',
          href: '/cargos',
          icon: <IconBoxSeam size={18} />,
        },
      ],
    },
    {
      title: 'Analysis',
      label: '',
      href: '/analysis',
      icon: <IconChartHistogram size={18} />,
    },
    {
      title: 'Extra Components',
      label: '',
      href: '/extra-components',
      icon: <IconComponents size={18} />,
    },
    {
      title: 'Error Pages',
      label: '',
      href: '',
      icon: <IconExclamationCircle size={18} />,
      sub: [
        {
          title: 'Not Found',
          label: '',
          href: '/404',
          icon: <IconError404 size={18} />,
        },
        {
          title: 'Internal Server Error',
          label: '',
          href: '/500',
          icon: <IconServerOff size={18} />,
        },
        {
          title: 'Maintenance Error',
          label: '',
          href: '/503',
          icon: <IconBarrierBlock size={18} />,
        },
      ],
    },
    {
      title: 'Settings',
      label: '',
      href: '/settings',
      icon: <IconSettings size={18} />,
    },
  ]
  