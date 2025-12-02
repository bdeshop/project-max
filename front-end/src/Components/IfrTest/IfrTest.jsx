import React, { useRef, useEffect, useState } from "react";

export default function IfrTest() {
  const iframeRef = useRef(null);
  const [token, setToken] = useState(null);

  const handleIframeLoad = () => {
    console.log("✅ Iframe loaded!");

    // ইফ্রেমের src থেকে access_token পার্স করা
    const iframeSrc = iframeRef.current.src;
    const url = new URL(iframeSrc);
    const accessToken = url.searchParams.get("access_token");

    if (accessToken) {
      console.log("🎯 Access Token from URL:", accessToken);
      setToken(accessToken);
    } else {
      console.log("⚠️ No access_token found in iframe URL");
    }
  };

  useEffect(() => {
    function handleMessage(event) {
      console.log("📩 Full message from iframe:", event.data);
      if (event.data?.type === "TOKEN" && event.data.token) {
        console.log("🎯 Token received from postMessage:", event.data.token);
        setToken(event.data.token); // postMessage থেকে টোকেন পেলেও সেট করা
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div>
      <h2>Iframe Token Demo</h2>
      <iframe
        ref={iframeRef}
        src="https://casinogameurl.turnkeyxgaming.com/casino/c72aa825c92c5f5fad532b117151c41d765328138f2912f9ab0998f9eafeb2c7cdb501947398f454dd84dc0a5a62a24718b835f04deaf71a6a96c4d50b92ab08a7c7c4ba60276acddde1afb12ef72953"
        onLoad={handleIframeLoad}
        style={{ width: "100%", height: "80vh", border: "none" }}
        title="CasinoGame"
      />
      <div style={{ marginTop: "20px" }}>
        {token ? (
          <p>
            🎯 Token: <code>{token}</code>
          </p>
        ) : (
          <p>Token not received yet...</p>
        )}
      </div>
    </div>
  );
}
