import React from "react";
import { AdaptableCard } from "components/shared";
import { t } from "i18next";
import DepositTable from "./components/DepositTable";

const Deposit = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">{t('Deposit')}</h3>
      </div>
      <DepositTable />
    </AdaptableCard>
  );
};

export default Deposit;
