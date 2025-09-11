import { server } from "./server";
export class API {
  baseUrl: string;
  headers: Headers;
  constructor(baseUrl = server.baseUrl) {
    this.baseUrl = baseUrl;
    this.headers = new Headers({ "Content-Type": "application/json" });
  }

  private async request(endpoint: string, options: RequestInit) {
    // ghép baseUrl + endpoint
    // merge headers
    // fetch(...)
    // check response.ok
    // return response.json()
    // console.log("----" + JSON.stringify(options));
    // console.log("+++++" + this.baseUrl + endpoint);

    const res = await fetch(this.baseUrl + endpoint, {
      ...options,
      headers: this.headers,
    });

    // console.log("2" + endpoint, JSON.stringify(options));

    if (!res.ok) {
      const errorAPI = await res.json();
      throw new Error(errorAPI.message || "Error: No Message");
    }
    return await res.json();
  }
  public async getNoToken(endPoint: string) {
    return await this.request(endPoint, {});
  }

  public async getWithToken(endPoint: string, token: string) {
    this.setToken(token);
    return await this.request(endPoint, {});
  }

  public async post(endPoint: string, body: unknown) {
    // console.log('----' + JSON.stringify(body));
    return await this.request(endPoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  setToken(token: string) {
    this.headers["Authorization"] = "Bearer " + token;
  }
}

// const a = new API("https://dummyjson.com");
// a.getNoToken("/products").then((data) => console.log(data));
