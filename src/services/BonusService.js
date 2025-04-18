// BonusService.js

const mockBonusData = {
  user: {
    name: "Sobirov Akmal",
    id: 168654,
    totalSum: "3 016 633"
  },
  table: [
    {
      date: "01.04.25",
      kreditUZS: "209 936",
      omonatUZS: "16 815",
      omonatUSD: "19 331",
      pulOtkazma: "400 688",
      tolovlar: "11 951",
      kartaEmissiya: "6 000"
    },
    {
      date: "02.04.25",
      kreditUZS: "431 973",
      omonatUZS: "32 381",
      omonatUSD: "17 221",
      pulOtkazma: "240 954",
      tolovlar: "10 593",
      kartaEmissiya: "10 000"
    },
    {
      date: "03.04.25",
      kreditUZS: "720 399",
      omonatUZS: "",
      omonatUSD: "17 992",
      pulOtkazma: "106 196",
      tolovlar: "8 041",
      kartaEmissiya: "7 000"
    },
    {
      date: "04.04.25",
      kreditUZS: "453 788",
      omonatUZS: "15 838",
      omonatUSD: "2 852",
      pulOtkazma: "263 150",
      tolovlar: "8 534",
      kartaEmissiya: "5 000"
    }
  ]
};

const BonusService = {
  getBonusData: () => {
    return Promise.resolve({ data: mockBonusData });
  }
};

export default BonusService;