"use strict";(()=>{var e={};e.id=717,e.ids=[717],e.modules={8013:e=>{e.exports=require("mongodb")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9840:(e,t,r)=>{let o,i;r.r(t),r.d(t,{originalPathname:()=>w,patchFetch:()=>y,requestAsyncStorage:()=>d,routeModule:()=>u,serverHooks:()=>g,staticGenerationAsyncStorage:()=>h});var a={};r.r(a),r.d(a,{GET:()=>m});var n=r(9303),s=r(8716),l=r(670),p=r(8013);async function c(){return o||(o=new p.MongoClient(process.env.MONGO_URL),await o.connect(),i=o.db(process.env.DB_NAME||"iltmc")),i}async function m(){let e=process.env.NEXT_PUBLIC_BASE_URL||"https://iltmc.com";try{let t=await c();await t.collection("members").find({status:{$in:["active","veteran"]}}).toArray(),await t.collection("rides").find({isPublic:!0}).toArray(),await t.collection("events").find({isPublic:!0}).toArray();let r=await t.collection("blog").find({published:!0}).toArray(),o=new Date().toISOString().split("T")[0],i=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;for(let t of[{url:"",priority:"1.0",changefreq:"weekly"},{url:"#about",priority:"0.8",changefreq:"monthly"},{url:"#members",priority:"0.8",changefreq:"weekly"},{url:"#rides",priority:"0.8",changefreq:"weekly"},{url:"#events",priority:"0.8",changefreq:"weekly"},{url:"#gallery",priority:"0.7",changefreq:"weekly"},{url:"#join",priority:"0.9",changefreq:"monthly"},{url:"#contact",priority:"0.7",changefreq:"monthly"}])i+=`  <url>
    <loc>${e}/${t.url}</loc>
    <lastmod>${o}</lastmod>
    <changefreq>${t.changefreq}</changefreq>
    <priority>${t.priority}</priority>
  </url>
`;for(let t of r){let r=t.updatedAt||t.createdAt||new Date;i+=`  <url>
    <loc>${e}/blog/${t.slug}</loc>
    <lastmod>${new Date(r).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`}return i+="</urlset>",new Response(i,{headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=3600, s-maxage=3600"}})}catch(t){return console.error("Sitemap generation error:",t),new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${e}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`,{headers:{"Content-Type":"application/xml"}})}}let u=new n.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/sitemap.xml/route",pathname:"/sitemap.xml",filename:"route",bundlePath:"app/sitemap.xml/route"},resolvedPagePath:"/app/frontend/app/sitemap.xml/route.js",nextConfigOutput:"standalone",userland:a}),{requestAsyncStorage:d,staticGenerationAsyncStorage:h,serverHooks:g}=u,w="/sitemap.xml/route";function y(){return(0,l.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:h})}},9303:(e,t,r)=>{e.exports=r(517)}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[948],()=>r(9840));module.exports=o})();