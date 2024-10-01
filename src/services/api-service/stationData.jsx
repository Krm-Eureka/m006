import endpoint from "../axios";
import { setStatus } from "../setter";

export function GetLastAcousticTraceLog(
  version,
  productionLineID,
  SET,
  LOADING
) {
  console.log(
    `/api/v${version}/AcousticTraceLog/GetLastAcousticTraceLog/${productionLineID}`
  );
  // const getStatus = (status) => {
  //   switch (status) {
  //     case 0:
  //       return "Exception";
  //     case 1:
  //       return "Testing";
  //     case 2:
  //       return "PASS";
  //     case 3:
  //       return "FAIL";
  //     default:
  //       return "Exception";
  //   }
  // };
  const getData = async () => {
    try {
      const res = await endpoint.get(
        `/api/v${version}/AcousticTraceLog/GetLastAcousticTraceLog/${productionLineID}`
      );
      console.log(`LastActTrace ${productionLineID} : `, res.data);
      // Assign statuses
      const acousticStatus = setStatus(res.data.data.acousticStatus);
      const qrcodeStatus = setStatus(res.data.data.qrStatus);
      const laserMarkStatus = setStatus(res.data.data.laserMarkStatus);
      const judgementResult = setStatus(
        res.data.data.tracReporJudgementtResult
      );
      const tracReportStatus = setStatus(res.data.data.tracReportStatus);

      // Log the statuses
      console.log('data : ' ,res.data.data);
      
      console.log(`Acoustic Status: ${acousticStatus.text}`);
      console.log(`QR Code Status: ${qrcodeStatus.text}`);
      console.log(`Laser Mark Status: ${laserMarkStatus.text}`);
      console.log(`Judgement Result: ${judgementResult.text}`);
      console.log(`Traceability Status: ${tracReportStatus.text}`);
      // SET(res.data.data);
      SET({
        ...res.data.data,
        acousticStatus: acousticStatus.text,
        acousticClass: acousticStatus.className,
        qrcodeStatus: qrcodeStatus.text,
        qrcodeClass: qrcodeStatus.className,
        lasermarkStatus: laserMarkStatus.text,
        lasermarkClass: laserMarkStatus.className,
        judgementResult: judgementResult.text,
        judgementClass: judgementResult.className,
        tracReportStatus: tracReportStatus.text,
        tracReportClass: tracReportStatus.className,
      });
      {
        LOADING(
          res.data.succeeded && res.data.succeeded === true ? false : true
        );
      }
    } catch (error) {
      console.error("Failed to fetch Data:", error);
    }
  };
  getData();
}
export function GetAcousticTraceDetailById(
  version,
  acousticTraceId,
  SET,
  LOADING
) {
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
        LOADING(
          res.data.succeeded && res.data.succeeded === true ? false : true
        );
      }
    } catch (error) {
      console.error("Failed to fetch Data:", error);
    }
  };
  getData();
}
