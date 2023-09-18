import { apiURLs } from "../api";

export function GoogleLogin() {
  const googleAuth = () => {
    window.open(`${apiURLs["development"]}/auth/google/callback`, "_self");
  };
}
