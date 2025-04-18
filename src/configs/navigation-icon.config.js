import React from 'react'
import {
    HiHome,
    HiOutlineCash,
    HiOutlineCreditCard,
    HiOutlineCubeTransparent,
    HiOutlineCurrencyDollar,
    HiOutlineDocumentDuplicate,
    HiOutlineGlobeAlt,
} from 'react-icons/hi'

const navigationIcon = {
    home: <HiHome />,
    payments: <HiOutlineCurrencyDollar />,
    loan: <HiOutlineCubeTransparent />,
    deposit: <HiOutlineCreditCard />,
    deposit_usd_service: <HiOutlineDocumentDuplicate />,
    card_issuance_service: <HiOutlineCash />,
    money_transfers: <HiOutlineGlobeAlt />,
}

export default navigationIcon
