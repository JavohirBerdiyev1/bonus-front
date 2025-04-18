import React from "react";
import { AdaptableCard } from "components/shared";
import { t } from "i18next";
import CardIssuanceTable from "./components/CardIssuanceTable";

const CardIssuance = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">{t('Card Issuance')}</h3>
      </div>
      <CardIssuanceTable />
    </AdaptableCard>
  );
};

export default CardIssuance;
