import endpoint from "../axios";

export function GetLastAcousticTraceLog(
  version,
  productionLineID,
  SET,
  LOADING
) {
  console.log(
    `/api/v${version}/AcousticTraceLog/GetLastAcousticTraceLog/${productionLineID}`
  );
  const getData = async () => {
    try {
      const res = await endpoint.get(
        `/api/v${version}/AcousticTraceLog/GetLastAcousticTraceLog/${productionLineID}`
      );
      console.log(`LastActTrace ${productionLineID} : `, res.data);

      SET(res.data.data);
      {
        res.data.succeeded && res.data.succeeded === true
          ? LOADING(false)
          : LOADING(true);
      }
    } catch (error) {
      console.error("Failed to fetch Data:", error);
    }
  };
  getData();
}
export function GetAcousticTraceDetailById(version,
  acousticTraceId,
  SET,
  LOADING){
    console.log(
      `/api/v${version}/AcousticTraceDetail/GetByAcousticLogId/${acousticTraceId}`
    );
    const getData = async () => {
      try {
        const res = await endpoint.get(
          `/api/v${version}/AcousticTraceDetail/GetByAcousticLogId/${acousticTraceId}`
        );
        console.log(`AcousticTraceDetail ${acousticTraceId} : `, res.data);
  
        SET(res.data.data);
        
        {
          res.data.succeeded && res.data.succeeded === true
            ? LOADING(false)
            : LOADING(true);
        }
      } catch (error) {
        console.error("Failed to fetch Data:", error);
      }
    };
    getData();
}
