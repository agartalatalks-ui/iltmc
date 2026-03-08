"use strict";(()=>{var e={};e.id=703,e.ids=[703],e.modules={8013:e=>{e.exports=require("mongodb")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4039:(e,t,o)=>{let r,n;o.r(t),o.d(t,{originalPathname:()=>b,patchFetch:()=>w,requestAsyncStorage:()=>m,routeModule:()=>d,serverHooks:()=>g,staticGenerationAsyncStorage:()=>x});var a={};o.r(a),o.d(a,{GET:()=>c});var s=o(9303),i=o(8716),p=o(670),l=o(8013);async function u(){return r||(r=new l.MongoClient(process.env.MONGO_URL),await r.connect(),n=r.db(process.env.DB_NAME||"iltmc")),n}async function c(){let e=process.env.NEXT_PUBLIC_BASE_URL||"https://iltmc.com";try{let t=await u(),o=await t.collection("seo_settings").findOne({key:"global"}),r=o?.robotsTxt||`# ILTMC - Intrepidus Leones Tripura Motorcycle Club
# robots.txt

User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin
Disallow: /api/admin

# Sitemap
Sitemap: ${e}/sitemap.xml`;return r.includes("Sitemap:")||(r+=`

Sitemap: ${e}/sitemap.xml`),new Response(r,{headers:{"Content-Type":"text/plain","Cache-Control":"public, max-age=3600, s-maxage=3600"}})}catch(t){return console.error("Robots.txt generation error:",t),new Response(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin

Sitemap: ${e}/sitemap.xml`,{headers:{"Content-Type":"text/plain"}})}}let d=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/robots.txt/route",pathname:"/robots.txt",filename:"route",bundlePath:"app/robots.txt/route"},resolvedPagePath:"/app/frontend/app/robots.txt/route.js",nextConfigOutput:"standalone",userland:a}),{requestAsyncStorage:m,staticGenerationAsyncStorage:x,serverHooks:g}=d,b="/robots.txt/route";function w(){return(0,p.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:x})}},9303:(e,t,o)=>{e.exports=o(517)}};var t=require("../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[948],()=>o(4039));module.exports=r})();