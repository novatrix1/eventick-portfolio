import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    [
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: "com.arsprod01.eventick",
          sha256_cert_fingerprints: ["1E:81:40:8F:93:CD:E6:CD:C4:AF:A9:5F:14:F8:84:F2:B0:01:F2:FA:49:C4:6D:47:78:D7:C4:A4:2F:C0:B2:84"],
        },
      },
    ],
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}