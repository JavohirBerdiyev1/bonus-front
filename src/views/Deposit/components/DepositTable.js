// DepositTable.js (DatePicker o‘rniga MonthSelect bilan)
import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "components/shared";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import useStoreTable from "configs/dataSlice";
import { Card } from "components/ui";
import NumberFormat from "react-number-format";
import DepositService from "../services/deposit_service";
import MonthSelect, { months } from "utils/MonthSelect";
import { getMonthRange } from "utils/getMonthRange";

const DepositTable = () => {
  const { tableData: tableState, setTableData } = useStoreTable();
  const { pageIndex, pageSize, sort, query } = tableState;

  const [total, setTotal] = useState(0);
  const [err, setErr] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const { start, end } = getMonthRange(selectedMonth);
      const response = await DepositService.getAll(pageIndex, pageSize, [start, end]);
      const { items } = response?.data || [];
      setData(items);
      setTotal(response?.data?.meta?.count || 0);
    } catch (error) {
      setErr(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, [pageIndex, pageSize, sort, query, selectedMonth]);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      Cell: ({ row }) => <span className="ml-2">{row.original.id}</span>,
    },
    {
      Header: "Xodim ID",
      accessor: "employee_id",
      Cell: ({ row }) => <span className="ml-2">{row.original.employee_id}</span>,
    },
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
      Header: "Depozit ID",
      accessor: "deposit_id",
      Cell: ({ row }) => <span className="ml-2">{row.original.deposit_id}</span>,
    },
    {
      Header: "Depozit miqdori",
      accessor: "deposit_amount",
      Cell: ({ row }) => (
        <span className="ml-2">
          <NumberFormat
            value={row.original.deposit_amount}
            displayType="text"
            thousandSeparator
            suffix=" UZS"
          />
        </span>
      ),
    },
    {
      Header: "Depozit turi",
      accessor: "deposit_type",
      Cell: ({ row }) => <span className="ml-2">{row.original.deposit_type}</span>,
    },
    {
      Header: "Bonus komissiya",
      accessor: "bonus_commission",
      Cell: ({ row }) => (
        <span className="ml-2">
          <NumberFormat
            value={row.original.bonus_commission}
            displayType="text"
            thousandSeparator
            suffix=" UZS"
          />
        </span>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => <span className="ml-2 capitalize">{row.original.status}</span>,
    },
    {
      Header: "Yaratilgan",
      accessor: "created_at",
      Cell: ({ row }) => (
        <span className="ml-2">
          {dayjs(row.original.created_at).format("YYYY-MM-DD HH:mm")}
        </span>
      ),
    },
  ];

  const tableMemoData = useMemo(
    () => ({
      pageIndex,
      pageSize,
      sort,
      query,
      total,
    }),
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
      <MonthSelect
        value={selectedMonth}
        onChange={setSelectedMonth}
        className="m-4 w-[300px]"
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

export default DepositTable;