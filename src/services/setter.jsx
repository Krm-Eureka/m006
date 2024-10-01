export function setStatus(name, status) {
    const statusMap = {
      0: {
        text: "Exception",
        className: "bg-yellow-400 text-white font-semibold",
      },
      1: {
        text: {
          acoustictest: "Testing",
          qrcode: "Reading",
          lasermark: "Marking",
          totalstatus: "Reading",
          current: "Reading",
        }[name] || "Reading",
        className: "bg-blue-400 text-white font-semibold",
      },
      2: {
        text: "PASS",
        className: "bg-green-500 text-white font-semibold",
      },
      3: {
        text: "FAIL",
        className: "bg-red-500 text-white font-semibold",
      },
      default: {
        text: "Exception",
        className: "bg-yellow-400 text-white font-semibold",
      },
    };
  
    return statusMap[status] || statusMap.default;
  }
  