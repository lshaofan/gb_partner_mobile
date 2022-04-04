export interface r {
  /**
   * 开发者服务器返回的数据
   */
  result: string | AnyObject | ArrayBuffer;
  /**
   * 开发者服务器返回的 HTTP 状态码
   */
  code: number;
  /**
   * 开发者服务器返回的 HTTP Response Header
   */
  header: any;
  /**
   * 开发者服务器返回的 cookies，格式为字符串数组
   */
  cookies: string[];
}
