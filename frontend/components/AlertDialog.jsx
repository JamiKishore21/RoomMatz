import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

const AlertDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message = "This action can't be undone. Please confirm if you want to proceed.",
    type = "warning", // warning, success, error, info
    confirmText = "Confirm",
    cancelText = "Cancel",
    showCancel = true
}) => {
    if (!isOpen) return null;

    const typeConfig = {
        warning: {
            icon: AlertTriangle,
            iconBg: "bg-blue-500",
            iconColor: "text-white",
            confirmBg: "bg-blue-500 hover:bg-blue-600"
        },
        success: {
            icon: CheckCircle,
            iconBg: "bg-green-500",
            iconColor: "text-white",
            confirmBg: "bg-green-500 hover:bg-green-600"
        },
        error: {
            icon: AlertCircle,
            iconBg: "bg-red-500",
            iconColor: "text-white",
            confirmBg: "bg-red-500 hover:bg-red-600"
        },
        info: {
            icon: Info,
            iconBg: "bg-blue-500",
            iconColor: "text-white",
            confirmBg: "bg-blue-500 hover:bg-blue-600"
        }
    };

    const config = typeConfig[type] || typeConfig.warning;
    const Icon = config.icon;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Dialog */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-in-up">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className={`${config.iconBg} ${config.iconColor} rounded-full p-4 shadow-lg animate-pulse-glow`}>
                        <Icon className="h-8 w-8" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-gray-600 text-center mb-8 leading-relaxed">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    {showCancel && (
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-12 text-base font-semibold border-2 hover:bg-gray-50 transition-all duration-200"
                        >
                            {cancelText}
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 h-12 text-base font-semibold text-white ${config.confirmBg} transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105`}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AlertDialog;
