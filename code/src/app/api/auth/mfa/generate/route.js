import AuthController from "@/controllers/auth.controller";
import AuthMFAController from "@/controllers/auth_mfa.controller";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await AuthMFAController.generate(body);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
