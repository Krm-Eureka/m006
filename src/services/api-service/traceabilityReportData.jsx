import endpoint from "../axios";

const getTraceabilityDataWithDate = (version, start, end, SN, SET) => {
  const getData = async () => {
    const url =
      SN !== null
        ? `/api/v${version}/AcousticTraceLog/GetByDateRange?startDate=${encodeURIComponent(
            start
          )}&endDate=${encodeURIComponent(end)}&serialCode=${encodeURIComponent(
            SN
          )}`
        : `/api/v${version}/AcousticTraceLog/GetByDateRange?startDate=${encodeURIComponent(
            start
          )}&endDate=${encodeURIComponent(end)}`;

    console.log(url);

    try {
      const res = await endpoint.get(url);
      SET(res.data.data);
    } catch (error) {
      console.error("Failed to fetch Data:", error);
    }
  };

  getData();
};
const getTraceabilityDataWithSerial = async (version, SN, SET) => {
  if (SN !== null) {
    const url = `/api/v${version}/AcousticTraceLog/GetAcousticTraceLogBySerialNo/${encodeURIComponent(SN)}`;
    console.log(url);

    try {
      const res = await endpoint.get(url);
      console.log("Response Data:", res.data.data);

      SET(res.data.data); 
      return res.data.data; 
    } catch (error) {
      console.error("Failed to fetch Data:", error);
      return null; 
    }
  } else {
    console.error("Serial number is required");
    return null; 
  }
};

const retestById = async (version, data) => {
  if (data === null) {
    console.error("Data is required for retest");
    return;
  }

  const url = `/api/v${version}/AcousticTraceLog/SetReTestAcousticTracLogById`;

  try {
    console.log("Sending request to:", url);
    const res = await endpoint.put(url, data);
    console.log(res.data.data);

    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch Data:", error);
  }
};

const traceabilityService = {
  getTraceabilityDataWithDate,
  getTraceabilityDataWithSerial,
  retestById,
};

export default traceabilityService;
