import endpoint from "../axios";
// import { setStatus } from "../setter";

export async function GetLastAcousticTraceLog(
  version,
  productionLineID,
  SET,
  LOADING
) {
  console.log(
    `/api/v${version}/AcousticTraceLog/GetLastAcousticTraceLog/${productionLineID}`
  );

  try {
    const res = await endpoint.get(
      `/api/v${version}/AcousticTraceLog/GetLastAcousticTraceLog/${productionLineID}`
    );

    // console.log(`LastActTrace ${productionLineID} : `, res.data);
    SET(res.data.data);
    LOADING(!res.data.succeeded);
  } catch (error) {
    console.error("Failed to fetch Data:", error);
  }
}
export async function GetLastRetestAcoustic(version, SET, LOADING) {
  console.log(
    `/api/v${version}/AcousticTraceLog/GetLastRetestAcousticTraceLog`
  );

  try {
    const res = await endpoint.get(
      `/api/v${version}/AcousticTraceLog/GetLastRetestAcousticTraceLog`
    );

    // console.log(`LastActTrace ${productionLineID} : `, res.data);
    SET(res.data.data);
    LOADING(!res.data.succeeded);
  } catch (error) {
    console.error("Failed to fetch Data:", error);
  }
}

export async function GetAcousticTraceDetailById(
  version,
  acousticTraceId,
  SET,
  LOADING
) {
  try {
    const res = await endpoint.get(
      `/api/v${version}/AcousticTraceDetail/GetByAcousticLogId/${acousticTraceId}`
    );
    SET(res.data.data);
    LOADING(!res.data.succeeded);
  } catch (error) {
    console.error("Failed to fetch Data:", error);
  }
}
