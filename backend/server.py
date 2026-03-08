from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NEXTJS_URL = "http://localhost:3000"

@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
async def proxy_to_nextjs(request: Request, path: str):
    """Proxy all /api requests to Next.js server"""
    
    # Build the target URL
    target_url = f"{NEXTJS_URL}/api/{path}"
    
    # Get query params
    if request.query_params:
        target_url += f"?{request.query_params}"
    
    # Get headers (exclude host)
    headers = dict(request.headers)
    headers.pop("host", None)
    headers.pop("content-length", None)
    
    # Get body
    body = await request.body()
    
    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            response = await client.request(
                method=request.method,
                url=target_url,
                headers=headers,
                content=body,
            )
            
            # Return the response
            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=dict(response.headers),
                media_type=response.headers.get("content-type")
            )
        except httpx.TimeoutException:
            return Response(
                content='{"error": "Request timeout"}',
                status_code=504,
                media_type="application/json"
            )
        except Exception as e:
            return Response(
                content=f'{{"error": "{str(e)}"}}',
                status_code=500,
                media_type="application/json"
            )

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ILTMC API Proxy"}
