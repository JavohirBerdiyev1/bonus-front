import React from "react";
import { AdaptableCard } from "components/shared";
import { t } from "i18next";
import MainPageTable from "./components/PaymentsTable";


const MainPage = () => {
  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="mb-4 lg:mb-0">{t('Bonus')}</h3>
        </div>
        <MainPageTable />
      </AdaptableCard>
    </>
  );
};

export default MainPage;
