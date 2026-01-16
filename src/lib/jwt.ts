interface JwtPayload {
  exp?: number;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;

    if (!payload.exp) return true;

    // exp dalam detik → Date.now() ms
    const now = Math.floor(Date.now() / 1000);

    // buffer 30 detik (prevent race condition)
    return payload.exp < now + 30;
  } catch {
    return true;
  }
};
