// LoanTable.js (DatePicker o‘rniga MonthSelect bilan)
import React, { useEffect, useMemo, useState } from "react";
import { DataTable, GrowShrinkTag } from "components/shared";
import cloneDeep from "lodash/cloneDeep";
import PaymentsService from "../services/loan_service";
import dayjs from "dayjs";
import useStoreTable from "configs/dataSlice";
import { Card } from "components/ui";
import NumberFormat from "react-number-format";
import MonthSelect, { months } from "utils/MonthSelect";
import { getMonthRange } from "utils/getMonthRange";

const LoanTable = () => {
  const { tableData: tableState, setTableData } = useStoreTable();
  const { pageIndex, pageSize, sort, query } = tableState;

  const [total, setTotal] = useState(0);
  const [err, setErr] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());

  const fetchLoan = async () => {
    try {
      setLoading(true);
      const { start, end } = getMonthRange(selectedMonth);
      const response = await PaymentsService.getAll(pageIndex, pageSize, [start, end]);
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
    fetchLoan();
  }, [pageIndex, pageSize, sort, query, selectedMonth]);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      Cell: ({ row }) => <span className="ml-2">{row.original.id}</span>,
    },
   {
  Header: "Xodim ID",
  accessor: "emp_id", // employee_id -> emp_id
  Cell: ({ row }) => (
    <span className="ml-2">{row.original.emp_id}</span>
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
      Header: "Kredit ID",
      accessor: "credit_id",
      Cell: ({ row }) => <span className="ml-2">{row.original.credit_id}</span>,
    },
    {
      Header: "Kredit summasi",
      accessor: "credit_amount",
      Cell: ({ row }) => (
        <span className="ml-2">
          <NumberFormat
            value={row.original.credit_amount}
            displayType="text"
            thousandSeparator
            suffix=" UZS"
          />
        </span>
      ),
    },
    {
  Header: "Margin",
  accessor: "margin_summ",
  Cell: ({ row }) => (
    <span className="ml-2">
      <NumberFormat
        value={row.original.margin_summ}
        displayType="text"
        thousandSeparator
        suffix=" UZS"
      />
    </span>
  ),
},

    {
      Header: "Qolgan balans",
      accessor: "remaining_balance",
      Cell: ({ row }) => (
        <span className="ml-2">{row.original.remaining_balance} %</span>
      ),
    },
    {
      Header: "Yillik foiz",
      accessor: "percent_year",
      Cell: ({ row }) => (
        <span className="ml-2">{row.original.percent_year} %</span>
      ),
    },
    {
      Header: "Resurs foizi",
      accessor: "recource_percent",
      Cell: ({ row }) => (
        <span className="ml-2">{row.original.recource_percent} %</span>
      ),
    },
    {
      Header: "Margin",
      accessor: "margin",
      Cell: ({ row }) => <span className="ml-2">{row.original.margin} %</span>,
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

  const StatisticCard = ({ data = {}, label, valuePrefix, date }) => {
    return (
      <Card>
        <h6 className="font-semibold mb-4 text-sm">{label}</h6>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">
              <NumberFormat
                displayType="text"
                value={data.value}
                thousandSeparator
                prefix={valuePrefix}
              />
            </h3>
            <p>
              vs. 3 months prior to{" "}
              <span className="font-semibold">
                {dayjs(date).format("DD MMM")}
              </span>
            </p>
          </div>
          <GrowShrinkTag value={data.growShrink} suffix="%" />
        </div>
      </Card>
    );
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

export default LoanTable;