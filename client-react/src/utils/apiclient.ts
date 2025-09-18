// import { useUserStore } from "@/stores/UserStore";
// import { server } from "./server";
// const { setUser } = useUserStore();
// export class API {
//   baseUrl: string;
//   headers: Headers;
//   constructor(baseUrl = server.baseUrl) {
//     this.baseUrl = baseUrl;
//     this.headers = new Headers({ "Content-Type": "application/json" });
//   }

//   private async request(endpoint: string, options: RequestInit) {
//     // ghép baseUrl + endpoint
//     // merge headers
//     // fetch(...)
//     // check response.ok
//     // return response.json()
//     // console.log("----" + JSON.stringify(options));
//     // console.log("+++++" + this.baseUrl + endpoint);

//     const res = await fetch(this.baseUrl + endpoint, {
//       ...options,
//       headers: this.headers,
//     });

//     // console.log("2" + endpoint, JSON.stringify(options));

//     if (!res.ok) {
//       this.intercepterResponse(res);
//       const errorAPI = await res.json();
     
//     }

//     return await res.json();
//   }
//   public async get(endPoint: string, options: RequestInit = {}) {
//     return await this.request(endPoint, { ...options });
//   }

//   public async post(
//     endPoint: string,
//     body: unknown,
//     options: RequestInit = {}
//   ) {
//     // console.log('----' + JSON.stringify(body));
//     return await this.request(endPoint, {
//       ...options,
//       method: "POST",
//       body: JSON.stringify(body),
//     });
//   }

//   setToken(token: string) {
//     this.headers.set("Authorization", "Bearer " + token);
//   }
//   async intercepterResponse(response: Response) {
//     if (response.status == 401) {
//       const res = await fetch(this.baseUrl + "/api/user/refresh-token", {
//         credentials: "include",
//       });
//       if(!res.ok){
//         const errorAPI = await res.json();
//          throw new Error(errorAPI.message || "Error: No Message");
//       }
//     }
//   }
// }

// // const a = new API("https://dummyjson.com");
// // a.getNoToken("/products").then((data) => console.log(data));
