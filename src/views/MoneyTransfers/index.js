import React from "react";
import { AdaptableCard } from "components/shared";
import { t } from "i18next";
import MoneyTransfersTable from "./components/MoneyTransfersTable";


const MoneyTransfers = () => {
  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="mb-4 lg:mb-0">{t('Money Transfers')}</h3>
        </div>
        <MoneyTransfersTable />
      </AdaptableCard>
    </>
  );
};

export default MoneyTransfers;
