import http from 'http';
import dayjs from 'dayjs';

const getAll = async (pageIndex = 1, pageSize = 10, dateRange) => {
  let start_dttm, end_dttm;

  if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
    start_dttm = dayjs(dateRange[0]).format('YYYY-MM-DD');
    end_dttm = dayjs(dateRange[1]).format('YYYY-MM-DD');
  } else {
    const now = dayjs();
    start_dttm = now.startOf('month').format('YYYY-MM-DD');
    end_dttm = now.endOf('month').format('YYYY-MM-DD');
  }

  const response = await http.get(
    `bonus/get-all-bonus?start_dttm=${start_dttm}&end_dttm=${end_dttm}&page=${pageIndex}&limit=${pageSize}`
  );

  return response.data;
};

const AllBonusService = {
  getAll,
};

export default AllBonusService;
