import endpoint from "../axios";

const getTraceabilityDataWithDate = (version, start, end, SN, SET) => {
  const getData = async () => {
    const url = SN
      ? `/api/v${version}/AcousticTraceLog/GetByDateRange?startDate=${encodeURIComponent(
          start
        )}&endDate=${encodeURIComponent(end)}&serialCode=${encodeURIComponent(SN)}`
      : `/api/v${version}/AcousticTraceLog/GetByDateRange?startDate=${encodeURIComponent(
          start
        )}&endDate=${encodeURIComponent(end)}`;

    console.log(url);
    
    try {
      const res = await endpoint.get(url);
      console.log(res.data.data);
      SET(res.data.data);
    } catch (error) {
      console.error("Failed to fetch Data:", error);
    }
  };
  
  getData();
};

export default getTraceabilityDataWithDate;
