import { useState, useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HeaderLayout from "../header-component/";
import {
  GetLastAcousticTraceLog,
  GetAcousticTraceDetailById,
  GetFrequencyResult,
} from "../../services/api-service/stationData";
import Loading from "../loadingComponent";
import StatusBox from "../statusBox";
// import getTraceabilityDataWithDate from "../../services/api-service/traceabilityReportData";
import traceabilityService from "../../services/api-service/traceabilityReportData";
import { useNavigate } from "react-router-dom";
import GraphContain from "../graph";

function createSmrData(description, lowerValue, upperValue, result, status) {
  const formattedResult = parseFloat(result).toFixed(2);
  return {
    description,
    lowerValue,
    upperValue,
    result: formattedResult,
    status,
  };
}

const TraceabilityStatus = () => {
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  const [LstActLog, setLstActLog] = useState([]);
  const [LstStatusLog, setLstStatusLog] = useState([]);
  const [ActDetailById, setActDetailById] = useState([]);
  const [currentDescp, setCurrentDescp] = useState([]);
  const [frequencyResult, setFrequencyResult] = useState([]);
  const [smrData, setSmrData] = useState([]);
  const navigate = useNavigate();
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 86400000 * 7);
  const startDate = lastWeek.toISOString().split("T")[0] + " 00:00";
  const endDate = today.toISOString().split("T")[0] + " 23:59";
  const [save, setSave] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // if(LstActLog?.serialCode !== LstActLog?.serialCode || !LstActLog?.serialCode){
      //   setSave(false)
      // }
      try {
        await GetLastAcousticTraceLog("1", "1", setLstActLog, setLoading);
        await GetFrequencyResult('1',LstActLog?.serialCode,endDate,setFrequencyResult, setLoading)
        await traceabilityService.getTraceabilityDataWithDate(
          "1",
          startDate,
          endDate,
          null,
          setLstStatusLog
        );
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, [startDate, endDate]);

  const hasNavigated = useRef(false);

  useEffect(() => {
    if (
      LstActLog &&
      LstActLog.qualityTestFlag === true &&
      LstActLog.reTestFlag === false &&
      !hasNavigated.current
    ) {
      console.log("Navigating to QMode:", LstActLog?.qualityTestFlag);
      hasNavigated.current = true;
      try {
        navigate("/Console/Content_ACT/QMode");
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }
    // else if (
    //   LstActLog &&
    //   LstActLog.reTestFlag === true &&
    //   LstActLog.qualityTestFlag === false &&
    //   !hasNavigated.current
    // ) {
    //   console.log("Navigating to reTestMode:", LstActLog?.reTestFlag);
    //   hasNavigated.current = true;
    //   try {
    //     navigate("/Console/Content_ACT/ManualRun");
    //   } catch (error) {
    //     console.error("Navigation error:", error);
    //   }
    // }
    return () => {
      hasNavigated.current = false;
    };
  }, [LstActLog, navigate]);

  useEffect(() => {
    if (LstActLog && LstActLog.id) {
      const fetchDetails = async () => {
        try {
          await GetAcousticTraceDetailById(
            "1",
            LstActLog.id,
            (res) => {
              setActDetailById(res);
              const uniqueSmrData = Array.from(
                new Map(
                  res.map((i) => [
                    i.description,
                    createSmrData(
                      i.description,
                      i.lowerValue,
                      i.upperValue,
                      i.result,
                      i.status
                    ),
                  ])
                ).values()
              );
              const currentDescp = res.find(
                (item) => item.description === "Current"
              );
              // console.log(currentDescp);
              setCurrentDescp(currentDescp);
              setSmrData(uniqueSmrData);
              setLoading(false);
            },
            setLoading
          );
        } catch (err) {
          setError(err.message);
        }
      };
      fetchDetails();
    }
  }, [LstActLog]);

  // const handleTEST = () => {
  //   setSmrData([
  //     {
  //     description: "Sample item description",
  //     lowerValue: 10.5,
  //     upperValue: 20.75,
  //     result: 15.25,
  //     status: 'pass'
  //   },
  //     {
  //     description: "Sample item description",
  //     lowerValue: 10.5,
  //     upperValue: 20.75,
  //     result: 15.25,
  //     status: 'fail'
  //   },
  //     {
  //     description: "Sample item description",
  //     lowerValue: 10.5,
  //     upperValue: 20.75,
  //     result: 15.25,
  //     status: 'passed'
  //   },
  //     {
  //     description: "Sample item description",
  //     lowerValue: 10.5,
  //     upperValue: 20.75,
  //     result: 15.25,
  //     status: 'failed'
  //   },
  // ])
  //   setCurrentDescp([{
  //     description: "Sample item description",
  //     lowerValue: 10.5,
  //     upperValue: 20.75,
  //     result: 15.25,
  //     status: 'pass'
  //   }])
  //   setLoading(false)
  // }
  const mapStatus = (v) => {
    switch (v) {
      case 0:
        return null;
      case 1:
        return "PASS";
      case 2:
        return "FAIL";
      case 3:
        return "Unknown";
      default:
        return v;
    }
  };

  // console.log(ActDetailById);
  // console.log("Lst Log : ", LstStatusLog);

  const sortedStatus = [...(LstStatusLog || [])].sort(
    (a, b) => new Date(b.lastUpdateDate) - new Date(a.lastUpdateDate)
  );
  return (
    <>
      <HeaderLayout page="Traceability Status" />
      <div className="content h-screen">
        <div className="text-gray-700 bg-gray-300 m-4 rounded-md w-90% h-fit">
          <>
            <div className="title bg-green-500 p-2 rounded-t-md font-bold">
              <p>
                Acoustic EOLT Station : AUTO Mode{" "}
                {/* {LstActLog?.productionLineName || ""}  */}
                {">>>"}
                <span className="text-red-600 font-bold">
                  {LstActLog?.serialCode}
                </span>
              </p>
            </div>
            <div className="content flex flex-wrap flex-between p-4 items-center">
              <StatusBox
                name="AcousticTest"
                status={LstActLog?.acousticStatus}
              />
              {LstActLog?.length > 0 || LstActLog?.id ? (
                <StatusBox
                  name="Current"
                  status={
                    currentDescp?.status === "FAIL" ||
                    currentDescp?.status === "fail" ||
                    currentDescp?.status === 3
                      ? 3
                      : currentDescp?.status === "PASS" ||
                        currentDescp?.status === "pass" ||
                        currentDescp?.status === 2
                      ? 2
                      : 0
                  }
                />
              ) : (
                <StatusBox name="Current" />
              )}
              <StatusBox name="LaserMark" status={LstActLog?.laserMarkStatus} />
              <StatusBox name="QRCode" status={LstActLog?.qrStatus} />
              <StatusBox
                name="TotalStatus"
                status={LstActLog?.totalJudgement}
              />
            </div>
          </>
          {/* )}  */}
        </div>

        <div className="flex flex-row ">
          <div className="mr-20">
            <GraphContain
              saveTrick={save}
              result={[
                -5.390959913, -5.359269611, -5.323965401, -5.284565834,
                -5.23908674, -5.184922656, -5.12106089, -5.049120964,
                -4.971503243, -4.888837801, -4.800762094, -4.708973061,
                -4.617535985, -4.529206273, -4.442340268, -4.353233538,
                -4.261467409, -4.170567921, -4.082576524, -3.994462713,
                -3.901602557, -3.8037631, -3.705691896, -3.611589904,
                -3.521423869, -3.433182945, -3.346480926, -3.262835877,
                -3.183558945, -3.108705449, -3.037594007, -2.969370982,
                -2.903174183, -2.837810795, -2.771295847, -2.701633775,
                -2.628791188, -2.554909195, -2.481745223, -2.40939457,
                -2.338319442, -2.270572384, -2.2077864, -2.149729184,
                -2.095562252, -2.044838396, -1.996871162, -1.950489555,
                -1.904744927, -1.859241594, -1.813822554, -1.768368847,
                -1.723063361, -1.678615093, -1.635757642, -1.594646226,
                -1.55512383, -1.517037934, -1.479922475, -1.443043342,
                -1.405888897, -1.368271582, -1.330323759, -1.292551966,
                -1.255562208, -1.219821154, -1.18573686, -1.153632611,
                -1.123505524, -1.09502542, -1.067787168, -1.041381762,
                -1.015428063, -0.989715697, -0.964216329, -0.939033762,
                -0.9143045, -0.890085487, -0.866442309, -0.843485473,
                -0.821258837, -0.7997628, -0.779011813, -0.758994105,
                -0.739683068, -0.721021437, -0.702863447, -0.6850208,
                -0.667389485, -0.650075263, -0.633372311, -0.617622473,
                -0.603083015, -0.589805862, -0.577608887, -0.566209686,
                -0.555413051, -0.545205655, -0.535716385, -0.527104264,
                -0.519435832, -0.512577313, -0.506127082, -0.499483458,
                -0.49208469, -0.483674863, -0.474355417, -0.46439779,
                -0.454008653, -0.443210421, -0.431908006, -0.420107962,
                -0.408145306, -0.396696246, -0.386464717, -0.377734922,
                -0.370149277, -0.362892654, -0.355144251, -0.346468172,
                -0.336928042, -0.326972554, -0.317246793, -0.30840202,
                -0.300951293, -0.295210366, -0.291303978, -0.289244008,
                -0.289066742, -0.290896401, -0.294815947, -0.300629202,
                -0.307762498, -0.31547175, -0.323227603, -0.330958724,
                -0.338952277, -0.347514326, -0.356682485, -0.366192754,
                -0.375644654, -0.384671804, -0.393004481, -0.400453754,
                -0.406905853, -0.412350555, -0.416884934, -0.420653881,
                -0.423755337, -0.426167104, -0.427742777, -0.428287907,
                -0.427663075, -0.42583804, -0.42288348, -0.418948458,
                -0.414256042, -0.409094069, -0.403763452, -0.398492365,
                -0.393379875, -0.388414, -0.383539507, -0.378712387,
                -0.373897506, -0.369004526, -0.363830568, -0.358119445,
                -0.351740491, -0.344820608, -0.337691809, -0.330729868,
                -0.324229874, -0.318341017, -0.313024054, -0.308052224,
                -0.303078424, -0.297745603, -0.291779868, -0.285018975,
                -0.277381818, -0.268832165, -0.259383807, -0.249155392,
                -0.23841008, -0.227483311, -0.216632681, -0.205967864,
                -0.195520207, -0.185331385, -0.175471192, -0.166014101,
                -0.157024072, -0.148544623, -0.140580292, -0.133088688,
                -0.126000723, -0.119262708, -0.112884527, -0.106966539,
                -0.101680222, -0.097194293, -0.093576657, -0.090766697,
                -0.088654115, -0.087152543, -0.08617146, -0.085560267,
                -0.085117032, -0.084633048, -0.083926601, -0.082864015,
                -0.081373964, -0.079445757, -0.077105211, -0.074387766,
                -0.071323934, -0.067928869, -0.064194157, -0.060092386,
                -0.055599797, -0.050723172, -0.045509218, -0.040036833,
                -0.034407147, -0.028733491, -0.023124562, -0.017667027,
                -0.012420759, -0.007423844, -0.002697788, 0.001746815,
                0.005900381, 0.009747095, 0.013273025, 0.016481519, 0.019393029,
                0.022027506, 0.024393134, 0.026500063, 0.028389286, 0.030149589,
                0.031911851, 0.033833784, 0.036085651, 0.038831547, 0.042208139,
                0.04632017, 0.051255489, 0.057096261, 0.063917936, 0.071790749,
                0.08078568, 0.090972526, 0.10240987, 0.115140862, 0.129197877,
                0.144604894, 0.161376968, 0.179532219, 0.199126099, 0.220296353,
                0.243295312, 0.268495133, 0.296370588, 0.327469796, 0.362379907,
                0.401703042, 0.446045355, 0.495972926, 0.551885207, 0.613836101,
                0.681388161, 0.753554715, 0.828833284, 0.905312044, 0.980832562,
                1.053190368, 1.120331273, 1.180486007, 1.232226946, 1.274488225,
                1.306594631, 1.328315021, 1.339920411, 1.342198354, 1.336376709,
                1.323937663, 1.306355313, 1.284847522, 1.260237291, 1.232957252,
                1.203156815, 1.170850966, 1.1360798, 1.099058719, 1.060282135,
                1.020564272, 0.981056439, 0.943280741, 0.909136315, 0.880770317,
                0.860278345, 0.849344605, 0.848971824, 0.859363576, 0.879940916,
                0.909455464, 0.946147642, 0.987884507, 1.032250573, 1.076666378,
                1.118691025, 1.156586427, 1.18991015, 1.219636067, 1.247601538,
                1.275708835, 1.305388768, 1.33742248, 1.371978777, 1.408753497,
                1.447153168, 1.48646597, 1.525960069, 1.564875033, 1.602307402,
                1.637019474, 1.667229962, 1.69046953, 1.703560977, 1.702702146,
                1.683551114, 1.641262348, 1.570682967, 1.467067687, 1.327230545,
                1.150389364, 0.937983038, 0.692543187, 0.41632474, 0.110269946,
                -0.226306018, -0.594959614, -0.996370036, -1.428174143,
                -1.88307511, -2.347999706, -2.805608822, -3.239532594,
                -3.642170914, -4.019324274, -4.385971671, -4.756269921,
                -5.137393803, -5.531264191, -5.939356882, -6.364776354,
                -6.81124822, -7.282011192, -7.7796842, -8.305511637,
                -8.856066162, -9.41725426, -9.958582505, -10.43363978,
                -10.79189782, -10.99827895, -11.04648117, -10.95572337,
                -10.75646239, -10.47759609, -10.14109896, -9.76278226,
                -9.356021564, -8.935553826, -8.518765684, -8.123501051,
                -7.763929396, -7.4471738, -7.172467025, -6.932746079,
                -6.717449029, -6.515614195, -6.319160821, -6.125672345,
                -5.938788987, -5.765485663, -5.612290151, -5.482835631,
                -5.377303758, -5.293021184, -5.225186134, -5.166954403,
                -5.108913533, -5.038999683, -4.944207758, -4.814287925,
                -4.645673086, -4.443125665, -4.218033589, -3.98447372,
                -3.755169099, -3.539057119, -3.341110158, -3.163734817,
                -3.008125551, -2.874370518, -2.760659053, -2.66292341,
                -2.575711159, -2.493812332, -2.413628585, -2.333838217,
                -2.25547724, -2.181554266, -2.11628371, -2.064212454,
                -2.029591835, -2.016151739, -2.027230995, -2.066254154,
                -2.137605577, -2.247676509, -2.405365379, -2.620616591,
                -2.898488863, -3.227479208, -3.570054678, -3.872004262,
                -4.089513158, -4.207030764, -4.232737819, -4.184475394,
                -4.078768799, -3.926085412, -3.732010685, -3.502515358,
                -3.248936746, -2.987987434, -2.736410904, -2.504725402,
                -2.295014674, -2.104063629, -1.928340889, -1.765900338,
                -1.614281509, -1.468396776, -1.32159349, -1.168070054,
                -1.003188902, -0.82140556, -0.614729644, -0.374588723,
                -0.096957541, 0.212910492, 0.540653683, 0.869221353,
                1.187283929, 1.492054666, 1.783789062, 2.058246293, 2.304881874,
                2.511672901, 2.67171252, 2.786839829, 2.866561579, 2.923057633,
                2.96537762, 2.996560522, 3.014683936, 3.016430812, 3.00126473,
                2.973615858, 2.941187486, 2.910547029, 2.88315978, 2.854331878,
                2.815447845, 2.75812502, 2.678144489, 2.577237817, 2.462214263,
                2.342361102, 2.226428068, 2.120452192, 2.027406225, 1.948379789,
                1.88397825, 1.835444649, 1.805430313, 1.797401143, 1.81308533,
                1.850415687, 1.906075871, 1.981396064, 2.084488663, 2.225464588,
                2.409483384, 2.633599088,
              ]}
              SC={
                LstActLog?.serialCode || "9865473780-68636791AA-241217-A-00061"
              }
              lCurrent="4.5"
              uCurrent="13"
              rCurrent="6.43"
              sCurrent="PASS"
              lSensitivity="-12.5"
              uSensitivity="-8.5"
              rSensitivity="-10.46"
              sSensitivity="PASS"
              lThd106="0"
              uThd106="1"
              rThd106="0.22"
              sThd106="pass"
              Frequency="fail"
            />
          </div>
          <div className="flex float-start mx-2 sm:flex-wrap lg:flex-wrap">
            <div className="md:mb-4 text-gray-700 bg-gray-300 mx-2 rounded-md w-90% h-fit">
              <div className="title bg-green-500 p-2 rounded-t-md text-gray-700 font-bold">
                <p>Show Data Run Summary</p>
              </div>
              <div className="content flex flex-between p-4 items-center">
                <div className="flex flex-between flex-wrap justify-start">
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ width: 700, overflowX: "auto" }}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <p className="font-semibold">Name</p>
                          </TableCell>
                          <TableCell align="center">
                            <p className="font-semibold">Lower</p>
                          </TableCell>
                          <TableCell align="center">
                            <p className="font-semibold">Upper</p>
                          </TableCell>
                          <TableCell align="center">
                            <p className="font-semibold">Result</p>
                          </TableCell>
                          <TableCell align="center">
                            <p className="font-semibold">Status</p>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {smrData.length <= 0 ? (
                          <TableRow>
                            {/* <div>
                            <button onClick={handleTEST}>TEST</button>
                          </div> */}
                            <TableCell colSpan={3} align="center">
                              <div className="items-center justify-center text-center p-4 pl-60">
                                <p className="text-gray-600 font-semibold">
                                  No data available
                                </p>
                                <Loading text="Data Not Found . . ." />
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          smrData.map((row, idx) => (
                            <TableRow
                              className={
                                row.status.toLowerCase() === "failed" ||
                                row.status.toLowerCase() === "fail"
                                  ? "bg-red-100"
                                  : ""
                              }
                              key={idx}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                align="left"
                                component="th"
                                scope="row"
                              >
                                <p className="font-semibold ">
                                  {row.description.toLowerCase() === "current"
                                    ? "Current (mA)"
                                    : row.description.toLowerCase() ===
                                      "sensitivity"
                                    ? "Sensitivity (dBV/Pa)"
                                    : row.description.toLowerCase() === "thd"
                                    ? "THD (%)"
                                    : row.description}
                                </p>
                              </TableCell>
                              <TableCell align="center">
                                {row.description.toLowerCase() ===
                                "frequency" ? (
                                  <p className="font-semibold ">NA</p>
                                ) : (
                                  <p className="font-semibold">
                                    {row.lowerValue}
                                  </p>
                                )}
                              </TableCell>
                              <TableCell align="center">
                                {row.description.toLowerCase() ===
                                "frequency" ? (
                                  <p className="font-semibold ">NA</p>
                                ) : (
                                  <p className="font-semibold ">
                                    {row.upperValue}
                                  </p>
                                )}
                              </TableCell>
                              <TableCell align="center">
                                {row.result === "Fail" ? (
                                  <p className="text-red-700 font-semibold">
                                    {row.result}
                                  </p>
                                ) : row.description.toLowerCase() ===
                                    "sensitivity" ||
                                  row.description.toLowerCase() === "thd" ||
                                  row.description.toLowerCase() ===
                                    "current" ? (
                                  row.result !== "" &&
                                  !isNaN(parseFloat(row.result)) &&
                                  row.lowerValue !== "" &&
                                  !isNaN(parseFloat(row.lowerValue)) &&
                                  row.upperValue !== "" &&
                                  !isNaN(parseFloat(row.upperValue)) &&
                                  parseFloat(row.result) >=
                                    parseFloat(row.lowerValue) &&
                                  parseFloat(row.result) <=
                                    parseFloat(row.upperValue) ? (
                                    <p className="text-green-700 font-semibold">
                                      {row.result}
                                    </p>
                                  ) : (
                                    <p className="text-red-700 font-semibold">
                                      {row.result}
                                    </p>
                                  )
                                ) : row.description.toLowerCase() ===
                                  "frequency" ? null : (
                                  row.result ===
                                  (
                                    <p className="text-green-700 font-semibold">
                                      {row.result}
                                    </p>
                                  )
                                )}
                              </TableCell>
                              <TableCell align="center">
                                {row.status.toLowerCase() === "failed" ||
                                row.status.toLowerCase() === "fail" ? (
                                  <p className="text-red-700 font-semibold">
                                    FAIL
                                  </p>
                                ) : row.status.toLowerCase() === "pass" ||
                                  row.status.toLowerCase() === "passed" ? (
                                  <p className="text-green-700 font-semibold">
                                    PASS
                                  </p>
                                ) : row.status.toLowerCase() === "" ? (
                                  <p className="font-semibold text-yellow-500">
                                    Exception
                                  </p>
                                ) : (
                                  ""
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
            <div className="text-gray-700 bg-gray-300 mx-2 rounded-md w-90% h-fit">
              <div className="title bg-green-500 p-2 rounded-t-md text-gray-700 font-bold">
                <p>Last Data Status</p>
              </div>
              <div className="content p-4 items-center">
                <div className="flex flex-between flex-wrap justify-start">
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ width: 700, overflowX: "auto" }}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <p className="font-semibold">Serial No.</p>
                          </TableCell>
                          <TableCell align="center">
                            <p className="font-semibold">Lasermark Code</p>
                          </TableCell>
                          <TableCell align="center">
                            <p className="font-semibold">Result</p>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(LstStatusLog) &&
                        LstStatusLog?.length > 0 ? (
                          sortedStatus.slice(1, 6).map((row) => {
                            const extractedCode = row.serialCode
                              ? row.serialCode.split("-").pop()
                              : "N/A";

                            const number =
                              extractedCode !== "N/A"
                                ? parseInt(extractedCode, 10)
                                : "N/A";
                            return (
                              <TableRow
                                key={row.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">
                                  <p className="font-semibold">{number}</p>
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="left"
                                >
                                  <p className="font-semibold">
                                    {row.serialCode}
                                  </p>
                                </TableCell>
                                <TableCell align="center">
                                  {row.totalJudgement === 1 ? (
                                    <p className="text-green-700 font-semibold">
                                      {mapStatus(row.totalJudgement)}
                                    </p>
                                  ) : row.totalJudgement === 3 ? (
                                    <p className="text-red-700 font-semibold">
                                      {mapStatus(row.totalJudgement)}
                                    </p>
                                  ) : row.totalJudgement === 2 ? (
                                    <p className="text-red-500 font-semibold">
                                      {mapStatus(row.totalJudgement)}
                                    </p>
                                  ) : (
                                    <p className="text-yellow-500 font-semibold">
                                      {mapStatus(row.totalJudgement)}
                                    </p>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              <div className="items-center justify-center text-center p-4">
                                <p className="text-gray-600 font-semibold">
                                  No data available
                                </p>
                                <Loading text="Data Not Found . . ." />
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TraceabilityStatus;
