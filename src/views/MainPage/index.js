import React from "react";
import { AdaptableCard } from "components/shared";
import { t } from "i18next";
import AllBonusTable from "./components/AllBonusTable";

const MainPage = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">{t('All bonus')}</h3>
      </div>
      <AllBonusTable />
    </AdaptableCard>
  );
};

export default MainPage;
