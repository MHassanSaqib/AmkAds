import { onRequestDelete as __api_portfolio__id__ts_onRequestDelete } from "C:\\Users\\Noor Hafeez\\OneDrive\\Desktop\\AmkAds\\functions\\api\\portfolio\\[id].ts"
import { onRequestPut as __api_portfolio__id__ts_onRequestPut } from "C:\\Users\\Noor Hafeez\\OneDrive\\Desktop\\AmkAds\\functions\\api\\portfolio\\[id].ts"
import { onRequestGet as __api_portfolio_index_ts_onRequestGet } from "C:\\Users\\Noor Hafeez\\OneDrive\\Desktop\\AmkAds\\functions\\api\\portfolio\\index.ts"
import { onRequestPost as __api_portfolio_index_ts_onRequestPost } from "C:\\Users\\Noor Hafeez\\OneDrive\\Desktop\\AmkAds\\functions\\api\\portfolio\\index.ts"
import { onRequestGet as __media___path___ts_onRequestGet } from "C:\\Users\\Noor Hafeez\\OneDrive\\Desktop\\AmkAds\\functions\\media\\[[path]].ts"

export const routes = [
    {
      routePath: "/api/portfolio/:id",
      mountPath: "/api/portfolio",
      method: "DELETE",
      middlewares: [],
      modules: [__api_portfolio__id__ts_onRequestDelete],
    },
  {
      routePath: "/api/portfolio/:id",
      mountPath: "/api/portfolio",
      method: "PUT",
      middlewares: [],
      modules: [__api_portfolio__id__ts_onRequestPut],
    },
  {
      routePath: "/api/portfolio",
      mountPath: "/api/portfolio",
      method: "GET",
      middlewares: [],
      modules: [__api_portfolio_index_ts_onRequestGet],
    },
  {
      routePath: "/api/portfolio",
      mountPath: "/api/portfolio",
      method: "POST",
      middlewares: [],
      modules: [__api_portfolio_index_ts_onRequestPost],
    },
  {
      routePath: "/media/:path*",
      mountPath: "/media",
      method: "GET",
      middlewares: [],
      modules: [__media___path___ts_onRequestGet],
    },
  ]