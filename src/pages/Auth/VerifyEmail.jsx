import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { VerifyEmail as verifyEmailService } from "~/service/AuthService/AuthService";

function VerifyEmail() {
  const { t } = useTranslation();
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
      <h1 className="text-xl font-bold">{t("auth.verify_email_title")}</h1>

      {loading && (
        <div className="py-4">
          <Loading>{t("auth.verifying")}</Loading>
        </div>
      )}

      {!loading && error && (
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <p className="text-[14px] text-red-500">
            {t("auth.invalid_or_expired_link")}
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="w-full cursor-pointer rounded-xl bg-white font-semibold text-black hover:bg-neutral-200"
          >
            {t("auth.go_to_login")}
          </Button>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
