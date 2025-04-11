import { HelpCircle, CheckCircle, AlertCircle } from "lucide-react";
const QuestionCardOption = ({
  questionData,
  onSelect,
  isActive,
  className,
}) => {
  // Determine the status icon
  let StatusIcon = HelpCircle;
  let statusColor = "text-gray-400";

  if (questionData.isSubmitted) {
    if (questionData.attempted) {
      if (questionData.isCorrect) {
        StatusIcon = CheckCircle;
        statusColor = "text-green-500";
      } else {
        StatusIcon = AlertCircle;
        statusColor = "text-red-500";
      }
    } else {
      StatusIcon = HelpCircle;
      statusColor = "text-gray-400";
    }
  } else if (questionData.attempted) {
    StatusIcon = CheckCircle;
    statusColor = "text-blue-500";
  }

  return (
    <button
      onClick={onSelect}
      className={`relative flex flex-col justify-center items-center p-4 rounded-lg shadow-md transition-all ${
        isActive ? "ring-2 ring-indigo-600 bg-indigo-50" : "hover:bg-indigo-50"
      } ${className || "bg-white"}`}
    >
      <span className="text-lg font-medium">{questionData.index}</span>
      <StatusIcon className={`w-4 h-4 mt-1 ${statusColor}`} />
    </button>
  );
};

export default QuestionCardOption;
