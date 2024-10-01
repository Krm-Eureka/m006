export function setStatus(status) {
  switch (status) {
    case 0:
      return {
        text: "Exception",
        className: "bg-yellow-400 text-white font-semibold",
      };
    case 1:
      return {
        text: "Reading",
        className: "bg-yellow-400 text-white font-semibold",
      };
    case 2:
      return {
        text: "PASS",
        className: "bg-green-500 text-white font-semibold",
      };
    case 3:
      return {
        text: "FAIL",
        className: "bg-red-500 text-white font-semibold",
      };
    default:
      return {
        text: "Exception",
        className: "bg-yellow-400 text-white font-semibold",
      };
  }
}
