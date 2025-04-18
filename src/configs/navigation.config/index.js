import { 
    NAV_ITEM_TYPE_TITLE, 
    NAV_ITEM_TYPE_COLLAPSE, 
    NAV_ITEM_TYPE_ITEM 
} from 'constants/navigation.constant'

const navigationConfig = [
    {
    key: 'home',
		path: '/home',
		title: 'Home',
		translateKey: 'nav.home',
		icon: 'home',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [],
        subMenu: []
    },
    /** Example purpose only */
    {
    key: 'payments',
		path: '/payments',
		title: 'Payments',
		translateKey: 'nav.payments',
		icon: 'payments',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [],
        subMenu: []
    },
		{
			key: 'loan',
			path: '/loan',
			title: 'Loan',
			translateKey: 'nav.loan',
			icon: 'loan',
			type: NAV_ITEM_TYPE_ITEM,
			authority: [],
					subMenu: []
		},
		{
			key: 'deposit',
			path: '/deposit',
			title: 'deposit',
			translateKey: 'nav.deposit',
			icon: 'deposit',
			type: NAV_ITEM_TYPE_ITEM,
			authority: [],
					subMenu: []
		},
		{
			key: 'deposit_usd_service',
			path: '/deposit_usd_service',
			title: 'Deposit USD Service',
			translateKey: 'nav.deposit_usd_service',
			icon: 'deposit_usd_service',
			type: NAV_ITEM_TYPE_ITEM,
			authority: [],
					subMenu: []
		},
		{
			key: 'card_issuance_service',
			path: '/card_issuance_service',
			title: 'Card Issuance Service',
			translateKey: 'nav.card_issuance_service',
			icon: 'card_issuance_service',
			type: NAV_ITEM_TYPE_ITEM,
			authority: [],
					subMenu: []
		},
		{
			key: 'money-transfers',
			path: '/money-transfers',
			title: 'Money Transfers',
			translateKey: 'nav.money-transfers',
			icon: 'money_transfers',
			type: NAV_ITEM_TYPE_ITEM,
			authority: [],
					subMenu: []
		},
		// MoneyTransfers
    {
        key: 'collapseMenu',
		path: '',
		title: 'Collapse Menu',
		translateKey: 'nav.collapseMenu.collapseMenu',
		icon: 'collapseMenu',
		type: NAV_ITEM_TYPE_COLLAPSE,
		authority: [],
        subMenu: [
            {
                key: 'collapseMenu.item1',
                path: '/collapse-menu-item-view-1',
                title: 'Collapse menu item 1',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
            {
                key: 'collapseMenu.item2',
                path: '/collapse-menu-item-view-2',
                title: 'Collapse menu item 2',
                translateKey: 'nav.collapseMenu.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
        ]
    },
    {
		key: 'groupMenu',
		path: '',
		title: 'Group Menu',
		translateKey: 'nav.groupMenu.groupMenu',
		icon: '',
		type: NAV_ITEM_TYPE_TITLE,
		authority: [],
		subMenu: [
            {
                key: 'groupMenu.single',
                path: '/group-single-menu-item-view',
                title: 'Group single menu item',
                translateKey: 'nav.groupMenu.single',
                icon: 'groupSingleMenu',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
			{
				key: 'groupMenu.collapse',
				path: '',
				title: 'Group collapse menu',
				translateKey: 'nav.groupMenu.collapse.collapse',
				icon: 'groupCollapseMenu',
				type: NAV_ITEM_TYPE_COLLAPSE,
				authority: [],
				subMenu: [
					{
						key: 'groupMenu.collapse.item1',
						path: '/group-collapse-menu-item-view-1',
						title: 'Menu item 1',
						translateKey: 'nav.groupMenu.collapse.item1',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [],
						subMenu: []
					},
                    {
						key: 'groupMenu.collapse.item2',
						path: '/group-collapse-menu-item-view-2',
						title: 'Menu item 2',
						translateKey: 'nav.groupMenu.collapse.item2',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [],
						subMenu: []
					},
                ]
            }
        ]
    }
]

export default navigationConfig