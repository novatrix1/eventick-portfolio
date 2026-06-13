//app/.well-known/apple-app-site-association/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      applinks: {
        apps: [],
        details: [
          {
            appID: "df5f7862.com.novatrix.eventick",
            paths: ["/events/*"],
          },
        ],
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}