import { useState } from "react";
import { CreditCardIcon, QrCodeIcon } from "@heroicons/react/24/solid";

const CheckOutPage = () => {
  const [loading, setLoading] = useState(false);

  const handleZaloPayCheckout = async () => {
    setLoading(true);
    try {
      // Gọi API tạo đơn hàng (giả lập ở đây)
      const response = await fetch("/api/zalo/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 9900, description: "Gói Premium 1 tháng" }),
      });

      const data = await response.json();

      if (data.order_url) {
        window.location.href = data.order_url; // Redirect đến ZaloPay
      } else {
        alert("❌ Không thể tạo đơn hàng ZaloPay.");
      }
    } catch (err) {
      alert("❌ Có lỗi xảy ra khi xử lý thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-4 py-16">
      <div className="max-w-lg mx-auto bg-[#1e293b] border border-green-400 rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-cyan-300 text-center flex items-center justify-center gap-2">
          <QrCodeIcon className="w-8 h-8 text-cyan-300" />
          Thanh toán Premium
        </h1>

        <div className="text-center text-sm text-gray-300">
          <p>Bạn đang mua:</p>
          <p className="mt-1 font-semibold text-cyan-300">🌟 Gói Premium — 9.900đ / tháng</p>
        </div>

        <div className="text-center">
          <button
            onClick={handleZaloPayCheckout}
            disabled={loading}
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-[#0f172a] font-semibold py-2 rounded-xl transition"
          >
            {loading ? "Đang xử lý..." : "Thanh toán bằng ZaloPay"}
          </button>
        </div>

        <p className="text-xs text-center text-gray-400 mt-4">
          Cổng thanh toán an toàn qua ZaloPay (giả lập).
        </p>
      </div>
    </div>
  );
};

export default CheckOutPage;
