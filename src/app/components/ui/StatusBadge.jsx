"use client";

const StatusBadge = ({ status }) => {
    const statusConfig = {
        "Completed": {
            color: "bg-green-500",
            text: "Completed"
        },
        "In Progress": {
            color: "bg-yellow-500",
            text: "In Progress"
        },
        "Not Started": {
            color: "bg-red-500",
            text: "Not Started"
        }
    };

    const config = statusConfig[status] || statusConfig["Not Started"];

    return (
        <div className="flex items-center gap-2">
            <span className={`${config.color} w-2 h-2 rounded-full animate-pulse`}></span>
            <span className="text-xs font-mono text-white/80 bg-black/50 px-2 py-1 rounded">
                {config.text}
            </span>
        </div>
    );
};

export default StatusBadge;