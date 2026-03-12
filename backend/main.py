import asyncio
import strawberry
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from fastapi.middleware.cors import CORSMiddleware
from typing import List # <-- Import List for type hinting

# 1. In-memory database to store our history
chat_history_db = []

@strawberry.type
class AIResponse:
    id: str
    prompt: str
    reply: str
    status: str

@strawberry.type
class Mutation:
    @strawberry.mutation
    async def ask_ai(self, prompt: str) -> AIResponse:
        await asyncio.sleep(2) # Simulate processing time
        
        new_id = f"req_{len(chat_history_db) + 1}"
        reply_text = f"Simulated AI analysis for your prompt: '{prompt}'. Everything looks optimal."
        
        response_obj = AIResponse(
            id="req_123",
            prompt=prompt,
            reply=reply_text,
            status="SUCCESS"
        )

        # Save to our "database"
        chat_history_db.append(response_obj)
        
        return response_obj

@strawberry.type
class Query:
    @strawberry.field
    def health_check(self) -> str:
        return "System is online and GraphiQL is ready."
    # 2. Add the history query
    @strawberry.field
    def get_history(self) -> List[AIResponse]:
        return chat_history_db

schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

app = FastAPI()

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