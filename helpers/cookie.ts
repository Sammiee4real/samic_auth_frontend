export const userCookieConfig = <{
      path: string,
      maxAge: number,
      sameSite: boolean,
      domain: string
  }> {
      path: "/",
      maxAge: 3600 * 6, // Expires after 6hrs
      sameSite: false,
      // domain: env === 'development' ? '' : ''
  }