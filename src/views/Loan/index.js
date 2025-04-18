import React from "react";
import { AdaptableCard } from "components/shared";
import { t } from "i18next";
import LoanTable from "./components/LoanTable";


const Loan = () => {
  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="mb-4 lg:mb-0">{t('Loan')}</h3>
        </div>
        <LoanTable />
      </AdaptableCard>
    </>
  );
};

export default Loan;
