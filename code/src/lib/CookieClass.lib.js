import { cookies } from "next/headers";

class CookieClassLib {
  static async setAuthToken(token) {
    const cookieStore = await cookies();

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  static async getAuthToken() {
    const cookieStore = await cookies();
    return cookieStore.get("auth_token")?.value;
  }

  static async removeAuthToken() {
    const cookieStore = await cookies();

    cookieStore.delete("auth_token");
  }
}

export default CookieClassLib;
