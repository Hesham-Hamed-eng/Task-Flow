interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning";
  onClose: () => void;
}

export function Toast({
  message,
  type = "success",
  onClose,
}: ToastProps) {
  const styles = {
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-lg border p-4 ${styles[type]}`}
      role="alert"
    >
      <p>{message}</p>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
}