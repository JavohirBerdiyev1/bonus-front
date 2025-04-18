import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [
    ...authRoute
]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/MainPage')),
        authority: [],
    },
    /** Example purpose only */
    {
        key: 'payments',
        path: '/payments',
        component: React.lazy(() => import('views/Payments')),
        authority: [],
    },
    {
        key: 'loan',
        path: '/loan',
        component: React.lazy(() => import('views/Loan')),
        authority: [],
    },
    {
        key: 'deposit',
        path: '/deposit',
        component: React.lazy(() => import('views/Deposit')),
        authority: [],
    },
    {
        key: 'deposit_usd_service',
        path: '/deposit_usd_service',
        component: React.lazy(() => import('views/DepositUsd')),
        authority: [],
    },
    {
        key: 'card_issuance_service',
        path: '/card_issuance_service',
        component: React.lazy(() => import('views/CardIssuance')),
        authority: [],
    },
    {
        key: 'money-transfers',
        path: '/money-transfers',
        component: React.lazy(() => import('views/MoneyTransfers')),
        authority: [],
    },

    // money-transfers
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: React.lazy(() => import('views/demo/GroupSingleMenuItemView')),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: React.lazy(() => import('views/demo/GroupCollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: React.lazy(() => import('views/demo/GroupCollapseMenuItemView2')),
        authority: [],
    },
]