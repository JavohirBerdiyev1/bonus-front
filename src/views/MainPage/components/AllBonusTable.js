// AllBonusTable.js (To'g'rilangan versiya)
import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "components/shared";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import useStoreTable from "configs/dataSlice";
import { Card } from "components/ui";
import NumberFormat from "react-number-format";
import AllBonusService from "../services/all-bonus";
import { useNavigate } from "react-router-dom";
import MonthSelect from "utils/MonthSelect";
import { getMonthRange } from "utils/getMonthRange";

const AllBonusTable = () => {
  const { tableData: tableState, setTableData } = useStoreTable();
  const { pageIndex, pageSize, sort, query } = tableState;
  const [total, setTotal] = useState(0);
  const [err, setErr] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({});
  const [userData, setUserData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());

  const navigate = useNavigate();

  const fetchAllBonus = async () => {
    try {
      setLoading(true);

      const { start, end } = getMonthRange(selectedMonth);

      const response = await AllBonusService.getAll(pageIndex, pageSize, [
        start,
        end,
      ]);

      const items = response?.data?.items || [];
      const totalsData = response?.data?.totals || {};

      setData(items);
      setTotals(totalsData);
      setTotal(response?.data?.meta?.dataCount || 0);
    } catch (error) {
      setErr(error);
    } finally {
      setLoading(false);
    }
  };

  const BonusStatCard = ({ label, value }) => (
    <Card className="p-4">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <h3 className="text-xl font-semibold">
        <NumberFormat
          value={value || 0}
          displayType="text"
          thousandSeparator
          suffix=" UZS"
        />
      </h3>
    </Card>
  );

  useEffect(() => {
    fetchAllBonus();
  }, [pageIndex, pageSize, sort, query, selectedMonth]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("user-info");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

 const columns = [
  {
    Header: "Hisoblangan sana",
    accessor: "bonus_calculated_date",
    Cell: ({ row }) => (
      <span className="ml-2">
        {dayjs(row.original.bonus_calculated_date).format("YYYY-MM-DD")}
      </span>
    ),
  },
  {
    Header: "Karta emissiya bonusi",
    accessor: "card_issuance_bonus",
    Cell: ({ row }) => (
      <span className="ml-2">
        {row.original.card_issuance_bonus !== null ? (
          <NumberFormat
            value={row.original.card_issuance_bonus}
            displayType="text"
            thousandSeparator
            suffix=" UZS"
          />
        ) : (
          "-"
        )}
      </span>
    ),
  },
  {
    Header: () => (
      <span
        onClick={() => navigate("/deposit_usd_service")}
        className="cursor-pointer text-blue-600 hover:underline"
      >
        Depozit USD bonusi
      </span>
    ),
    accessor: "deposit_usd_bonus",
    Cell: ({ row }) => (
      <span className="ml-2">
        {row.original.deposit_usd_bonus !== null ? (
          <NumberFormat
            value={row.original.deposit_usd_bonus}
            displayType="text"
            thousandSeparator
            suffix=" UZS"
          />
        ) : (
          "-"
        )}
      </span>
    ),
  },
  {
    Header: () => (
      <span
        onClick={() => navigate("/deposit")}
        className="cursor-pointer text-blue-600 hover:underline"
      >
        Depozit UZS bonusi
      </span>
    ),
    accessor: "deposit_uzs_bonus",
    Cell: ({ row }) => (
      <span className="ml-2">
        {row.original.deposit_uzs_bonus !== null ? (
          <NumberFormat
            value={row.original.deposit_uzs_bonus}
            displayType="text"
            thousandSeparator
            suffix=" UZS"
          />
        ) : (
          "-"
        )}
      </span>
    ),
  },
  {
    Header: () => (
      <span
        onClick={() => navigate("/loan")}
        className="cursor-pointer text-blue-600 hover:underline"
      >
        Kredit UZS bonusi
      </span>
    ),
    accessor: "loan_uzs_bonus",
    Cell: ({ row }) => (
      <span className="ml-2">
        {row.original.loan_uzs_bonus !== null ? (
          <NumberFormat
            value={row.original.loan_uzs_bonus}
            displayType="text"
            thousandSeparator
            suffix=" UZS"
          />
        ) : (
          "-"
        )}
      </span>
    ),
  },
  {
    Header: "Pul o'tkazma bonusi",
    accessor: "money_transfer_bonus",
    Cell: ({ row }) => (
      <span className="ml-2">
        {row.original.money_transfer_bonus !== null ? (
          <NumberFormat
            value={row.original.money_transfer_bonus}
            displayType="text"
            thousandSeparator
            suffix=" UZS"
          />
        ) : (
          "-"
        )}
      </span>
    ),
  },
  {
    Header: "To‘lovlar bonusi",
    accessor: "payments_bonus",
    Cell: ({ row }) => (
      <span className="ml-2">
        {row.original.payments_bonus !== null ? (
          <NumberFormat
            value={row.original.payments_bonus}
            displayType="text"
            thousandSeparator
            suffix=" UZS"
          />
        ) : (
          "-"
        )}
      </span>
    ),
  },
];


  const tableMemoData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const onPaginationChange = (page) => {
    const newTableData = cloneDeep(tableMemoData);
    newTableData.pageIndex = page;
    setTableData(newTableData);
  };

  const onSelectChange = (value) => {
    const newTableData = cloneDeep(tableMemoData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    setTableData(newTableData);
  };

  const onSort = (sort) => {
    const newTableData = cloneDeep(tableMemoData);
    newTableData.sort = sort;
    setTableData(newTableData);
  };

  return (
    <>
      {userData && (
        <div className="shadow rounded p-4 m-4">
          <h2 className="text-lg font-bold mb-2">Foydalanuvchi ma'lumotlari</h2>
          <p>
            <strong>F.I.Sh:</strong> {userData.fullname}
          </p>
          <p>
            <strong>Employee ID:</strong> {userData.employee_id}
          </p>
          <p>
            <strong>Status:</strong> {userData.status}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mb-4">
        <BonusStatCard
          label="Karta emissiya bonusi"
          value={totals.card_issuance_bonus}
        />
        <BonusStatCard
          label="Depozit USD bonusi"
          value={totals.deposit_usd_bonus}
        />
        <BonusStatCard
          label="Depozit UZS bonusi"
          value={totals.deposit_uzs_bonus}
        />
        <BonusStatCard
          label="Kredit UZS bonusi"
          value={totals.loan_uzs_bonus}
        />
        <BonusStatCard
          label="Pul o'tkazma bonusi"
          value={totals.money_transfer_bonus}
        />
        <BonusStatCard label="To‘lovlar bonusi" value={totals.payments_bonus} />
      </div>
      <MonthSelect
        value={selectedMonth}
        onChange={setSelectedMonth}
        className="w-[300px] m-4"
      />

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagingData={tableMemoData}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ width: 28, height: 28 }}
      />
    </>
  );
};

export default AllBonusTable;
