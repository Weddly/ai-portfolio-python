import asyncio
import strawberry
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from fastapi.middleware.cors import CORSMiddleware

# 1. Define the GraphQL Types
@strawberry.type
class AIResponse:
    id: str
    prompt: str
    reply: str
    status: str

# 2. Define the Mutation (Simulating or calling an AI)
@strawberry.type
class Mutation:
    @strawberry.mutation
    async def ask_ai(self, prompt: str) -> AIResponse:
        # Here is where you'd call Ollama, Gemini, or Hugging Face.
        # For now, we use a "Smart Mock" to simulate generation.
        await asyncio.sleep(2) # Simulate processing time
        
        reply_text = f"Simulated AI analysis for your prompt: '{prompt}'. Everything looks optimal."
        
        return AIResponse(
            id="req_123",
            prompt=prompt,
            reply=reply_text,
            status="SUCCESS"
        )

# 3. Define a basic Query (Required by GraphQL)
@strawberry.type
class Query:
    @strawberry.field
    def health_check(self) -> str:
        return "System is online and GraphiQL is ready."

# 4. Initialize the Server
schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

app = FastAPI()

# Allow Angular frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(graphql_app, prefix="/graphql")

# Initiate virtual env: 
# Run with: uvicorn main:app --reload

# Navigate to http://localhost:8000/graphql to use the GraphiQL interface to test your mock AI.