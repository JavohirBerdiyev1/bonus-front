// MainPageTable.js (oy bo‘yicha filtr bilan)
import React, { useEffect, useMemo, useState } from "react";
import { DataTable, GrowShrinkTag } from "components/shared";
import cloneDeep from "lodash/cloneDeep";
import PaymentsService from "../services/payments_service";
import dayjs from "dayjs";
import useStoreTable from "configs/dataSlice";
import { CheckNetwork } from "components/layout/CheckNetwork";
import { Card } from "components/ui";
import NumberFormat from "react-number-format";
import MonthSelect, { months } from "utils/MonthSelect";
import { getMonthRange } from "utils/getMonthRange";

const MainPageTable = () => {
  const { tableData: tableState, setTableData } = useStoreTable();
  const { pageIndex, pageSize, sort, query } = tableState;

  const [total, setTotal] = useState(0);
  const [err, setErr] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const { start, end } = getMonthRange(selectedMonth);
      const response = await PaymentsService.getAll(pageIndex, pageSize, [start, end]);

      const {
        data: { items },
      } = response;

      setData(items);
      setTotal(response?.data?.meta?.count || 0);
    } catch (error) {
      setErr(error);
    } finally {
      setLoading(false);
    }
  };

  const removePayment = async (id) => {
    try {
      await PaymentsService.removePayment(id);
      fetchPayments();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPayments();
    }, 500);

    return () => clearTimeout(timer);
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
      Cell: ({ row }) => (
        <span className="ml-2">{row.original.employee_id}</span>
      ),
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
      Header: "Kredit - UZS",
      accessor: "revenue",
      Cell: ({ row }) => <span className="ml-2">{row.original.revenue}</span>,
    },
    {
      Header: "Avtomatik daromad",
      accessor: "automated_revenue",
      Cell: ({ row }) => (
        <span className="ml-2">{row.original.automated_revenue}</span>
      ),
    },
    {
      Header: "Karta o'tkazma",
      accessor: "automated_card_transfer_revenue",
      Cell: ({ row }) => (
        <span className="ml-2">
          {row.original.automated_card_transfer_revenue}
        </span>
      ),
    },
    {
      Header: "UzPay o'tkazma",
      accessor: "uzpay_bonus_transfer_revenue",
      Cell: ({ row }) => (
        <span className="ml-2">
          {row.original.uzpay_bonus_transfer_revenue}
        </span>
      ),
    },
    {
      Header: "Bonus komissiya",
      accessor: "bonus_commission",
      Cell: ({ row }) => (
        <span className="ml-2">{row.original.bonus_commission}</span>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <span className="ml-2 capitalize">{row.original.status}</span>
      ),
    },
    {
      Header: "Yaratilgan vaqti",
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

export default MainPageTable;