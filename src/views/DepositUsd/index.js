import React from "react";
import { AdaptableCard } from "components/shared";
import { t } from "i18next";
import DepositUsdTable from "./components/DepositUsdTable";

const DepositUsd = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">{t('Deposit USD')}</h3>
      </div>
      <DepositUsdTable />
    </AdaptableCard>
  );
};

export default DepositUsd;
