 # Noesis                                                                                                                                                      
          
  > Strategic Knowledge Platform with AI                                                                                                                        
                                                            
  Noesis is a multi-tenant knowledge management platform that combines semantic search, AI-generated answers, and multi-source data integration — designed for
  organisations that need knowledge to be **findable**, not just stored.                                                                                        
                                                                        
  This repository contains the public landing page. The platform itself is developed in a private repository.                                                   
                                                                                                                                                                
  ## The Platform
                                                                                                                                                                
  Noesis addresses a fundamental problem in knowledge-intensive organisations: information exists, but no one can find it. The platform ingests data from
  multiple sources, processes it through a RAG (Retrieval-Augmented Generation) pipeline, and delivers AI-powered answers grounded in real data — with source   
  citations and confidence scores.                                                                                                                           
                                                                                                                                                                
  ### Core Capabilities                                     
                                                                                                                                                                
  - **Hybrid Search** — Keyword and semantic search combined, with language-aware full-text indexing
  - **RAG Responses** — AI-generated answers grounded in organisational data, not hallucinated                                                                  
  - **Multi-Tenant Isolation** — Row-level data isolation with role-based access control, enforced at the guard level
  - **Internationalisation** — Full i18n across every layer (API, dashboard, widget, database) supporting 5 languages                                           
  - **Embeddable Widget** — Drop-in Web Component for any website with theming and authentication                                                               
  - **AI-Powered FAQ** — Automated FAQ generation from any data source with approval workflows                                                                  
  - **Auto-Response Engine** — Condition-based response rules with contextual AI replies                                                                        
  - **Follow-Up CRM** — Contact management, campaigns, journey builder, and AI-assisted messaging                                                               
  - **Analytics & CSAT** — Search analytics, usage tracking, and customer satisfaction surveys                                                                  
                                                                                                                                                                
  ### Engineering at a Glance                                                                                                                                   
                                                                                                                                                                
  | Metric | Value |                                                                                                                                            
  |--------|-------|                                        
  | API Endpoints | 209 |
  | Data Models | 30 |   
  | Backend Modules | 21 |                                                                                                                                      
  | Unit Tests | 106 |    
  | Supported Languages | 5 |                                                                                                                                   
  | Architecture | Monorepo (3 apps + 3 shared packages) |  
                                                                                                                                                                
  ### Architecture                                                                                                                                              
   
  ┌─────────────────────────────────────────────────────┐                                                                                                       
  │  Clients                                            │   
  │  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │                                                                                                       
  │  │Dashboard │  │  Widget   │  │  External API    │  │
  │  │(Next.js) │  │  (Lit)    │  │  (API Key auth)  │  │                                                                                                       
  │  └──────────┘  └───────────┘  └──────────────────┘  │                                                                                                       
  ├─────────────────────────────────────────────────────┤                                                                                                       
  │  API Layer — NestJS + Guards + RBAC                 │                                                                                                       
  ├─────────────────────────────────────────────────────┤                                                                                                       
  │  Services                                           │                                                                                                       
  │  RAG Engine · Hybrid Search · AI Generation · Sync  │                                                                                                       
  ├─────────────────────────────────────────────────────┤                                                                                                       
  │  Data                                               │   
  │  PostgreSQL + pgvector · Redis + BullMQ · S3        │                                                                                                       
  └─────────────────────────────────────────────────────┘                                                                                                       
                                                                                                                                                                
  ### Tech Stack                                                                                                                                                
                                                                                                                                                                
  | Layer | Technologies |                                  
  |-------|-------------|
  | **Backend** | NestJS, Prisma, BullMQ, nestjs-i18n, Jest |
  | **Frontend** | Next.js 14, Tailwind CSS, Radix UI, next-intl |                                                                                              
  | **Widget** | Lit (Web Components), Vite |                                                                                                                   
  | **Data** | PostgreSQL, pgvector, Redis |                                                                                                                    
  | **AI** | OpenAI (embeddings + LLM), RAG pipeline with chunking and reranking |                                                                              
  | **Infrastructure** | TypeScript end-to-end, pnpm monorepo, Docker Compose, JWT + RBAC |                                                                     
                                                                                                                                                                
  ### Key Engineering Decisions                                                                                                                                 
                                                                                                                                                                
  - **Row-level multi-tenancy** over schema-per-tenant — simpler operations, same isolation guarantees through guard enforcement                                
  - **pgvector in PostgreSQL** over a dedicated vector database — reduces infrastructure complexity while maintaining search quality
  - **Language-aware search** with dynamic PostgreSQL regconfigs — full-text search respects morphology per language per request                                
  - **Shared type system** across all apps — single source of truth enforced at compile time                                                                    
  - **Separate public API controller** — widget-facing endpoints isolated from authenticated admin endpoints                                                    
                                                                                                                                                                
  ## Landing Page                                                                                                                                               
                                                                                                                                                                
  This repository contains the Noesis landing page — a static Next.js site.                                                                                     
   
  ### Setup                                                                                                                                                     
                                                            
  ```bash
  npm install
  npm run dev
  # http://localhost:3000

  Build                                                                                                                                                         
   
  npm run build                                                                                                                                                 
  # Static export in out/                                   

  Stack                                                                                                                                                         
   
  - Next.js 14 (static export)                                                                                                                                  
  - Tailwind CSS                                            
  - Geist font family
  - Lucide icons
  - Zero external dependencies                                                                                                                                  
   
  Use Cases                                                                                                                                                     
                                                            
  Enterprise & Scale-ups                                                                                                                                        
   
  Centralise documentation, policies, and procedures. AI-powered search lets employees find answers in seconds. Multi-tenant architecture supports multiple     
  business units or clients.                                
                                                                                                                                                                
  Academic & Research Institutions                          

  Index research papers, course materials, and institutional knowledge. RAG-powered Q&A grounded in actual sources with citations. Multi-language support for   
  international student bodies.
                                                                                                                                                                
  Customer Support                                          

  Generate FAQs automatically from documentation. CSAT surveys track satisfaction. Conversation flows build guided troubleshooting for chatbots.                
   
  Contact                                                                                                                                                       
                                                            
  For enterprise enquiries, academic partnerships, or technical collaboration:                                                                                  
   
  Email: jenniferdsbaumgart@gmail.com                                                                                                                  
                                                            
  ---
  Built by jenniferdsbaumgart@gmail.com