import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Link, useLocation } from 'react-router-dom'
import { PlusCircle, List, Package, LayoutDashboard, Users, Ticket, Settings, Layers, History, ListTree, Image, MessageSquare, Zap } from 'lucide-react'

const ALL_NAV_ITEMS = [
  { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard', roles: ['Admin']  },
  { to: '/employees', icon: <Users size={18} />,           label: 'Employees', roles: ['Admin']  },
  { to: '/import-batch', icon: <Package size={18} />,       label: 'Imports Hub', roles: ['Admin', 'Employee'] },
  { to: '/bulk-operation', icon: <Zap size={18} />,         label: 'Smart Ops', roles: ['Admin'] },
  { to: '/categories', icon: <Layers size={18} />,          label: 'Categories', roles: ['Admin', 'Employee'] },
  { to: '/sub-categories', icon: <ListTree size={18} />,    label: 'Sub-Categories', roles: ['Admin', 'Employee'] },
  { to: '/customers', icon: <Users size={18} />,           label: 'Customers', roles: ['Admin']  },
  { to: '/vouchers',  icon: <Ticket size={18} />,          label: 'Vouchers', roles: ['Admin']   },
  { to: '/settings',  icon: <Settings size={18} />,        label: 'Settings', roles: ['Admin']   },
  { to: '/add',       icon: <PlusCircle size={18} />,      label: 'Add Items', roles: ['Admin', 'Employee']  },
  { to: '/list',      icon: <List size={18} />,            label: 'List Items', roles: ['Admin', 'Employee'] },
  { to: '/orders',    icon: <Package size={18} />,         label: 'Orders', roles: ['Admin', 'Employee']     },
  { to: '/banners',   icon: <Image size={18} />,           label: 'Banners', roles: ['Admin', 'Employee']    },
  { to: '/reviews',   icon: <MessageSquare size={18} />,    label: 'Reviews', roles: ['Admin', 'Employee']    },
  { to: '/audit-logs', icon: <History size={18} />,         label: 'Audit Logs', roles: ['Admin'] },
]

const SidebarComponent = () => {
  const location = useLocation()
  
  let role = 'Admin';
  try {
     const token = localStorage.getItem('token');
     if (token) {
         const payload = JSON.parse(atob(token.split('.')[1]));
         if (payload.role) role = payload.role;
     }
  } catch(e) { }

  const navItems = ALL_NAV_ITEMS.filter(item => item.roles.includes(role));

  return (
    <Sidebar
      rootStyles={{
        height: '100vh',
        borderRight: '1px solid #f0f0f0',
        backgroundColor: '#ffffff',
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            margin: '4px 12px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: active ? '600' : '400',
            color: active ? '#ec4899' : '#6b7280',
            backgroundColor: active ? '#fdf2f8' : 'transparent',
            border: active ? '1px solid #fbcfe8' : '1px solid transparent',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#fdf2f8',
              color: '#ec4899',
            },
          }),
        }}
      >
        {navItems.map(({ to, icon, label }) => (
          <MenuItem
            key={to}
            icon={icon}
            component={<Link to={to} />}
            active={location.pathname === to}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  )
}

export default SidebarComponent