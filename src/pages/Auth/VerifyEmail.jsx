import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { VerifyEmail as verifyEmailService } from "~/service/AuthService/AuthService";

function VerifyEmail() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const token = search.get("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError(true);
      return;
    }
    (async () => {
      try {
        await verifyEmailService({ token });
        navigate("/login", {
          state: { verified: true },
        });
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, navigate]);

  return (
    <div className="flex w-full max-w-[400px] flex-col items-center gap-4 rounded-3xl border border-[#333333] bg-[#181818] p-8 text-white shadow-2xl">
      <h1 className="text-xl font-bold">Xác minh Email</h1>

      {loading && (
        <div className="py-4">
          <Loading>Đang xác minh...</Loading>
        </div>
      )}

      {!loading && error && (
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <p className="text-[14px] text-red-500">
            Liên kết đã hết hạn hoặc không hợp lệ.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="w-full cursor-pointer rounded-xl bg-white font-semibold text-black hover:bg-neutral-200"
          >
            Đi tới trang đăng nhập
          </Button>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
