# RAGFlow Web Documentation

## Overview

RAGFlow is a web application that integrates Retrieval-Augmented Generation (RAG) capabilities. The platform provides knowledge base management, conversational AI, and agent-based workflows through a modern web interface. The application name in Chinese is "知识挖掘" (Knowledge Mining).

## Project Structure

The RAGFlow project consists of several major components:

- **web/** - Frontend application
- **api/** - Backend services and REST API
- **agent/** - Agent system for workflow automation
- **rag/** - Core RAG functionality
- **graphrag/** - Graph-based RAG capabilities
- **deepdoc/** - Document processing and parsing
- **mcp/** - MCP server and client implementation
- **sandbox/** - Secure code execution environment

## Web Frontend

The web frontend is built with modern web technologies and provides a user interface for interacting with the RAGFlow system.

### Technology Stack

- **Framework**: [UmiJS](https://umijs.org/) (React-based framework)
- **UI Libraries**:
  - Ant Design (via `@ant-design/pro-components`)
  - Radix UI components
  - Tailwind CSS for styling
- **State Management**:
  - Zustand
  - React Query (via @tanstack/react-query)
- **Data Visualization**:
  - AntV G2 and G6
  - Recharts
- **Editor Integration**:
  - Monaco Editor (for code editing)
  - Lexical (for rich text editing)
- **Flow Visualization**:
  - XY Flow (for agent workflow canvas)

### Key Files and Directories

- `web/src/` - Source code for the frontend application
  - `components/` - Reusable UI components
  - `pages/` - Application pages
  - `hooks/` - Custom React hooks
  - `services/` - API service clients
  - `utils/` - Utility functions
  - `assets/` - Images and other static assets
  - `locales/` - Internationalization files
  - `theme/` - UI theming and styling
  - `routes.ts` - Application routing configuration

### Internationalization (i18n)

The application supports multiple languages through the i18next library. The following languages are supported:

- English (default)
- Chinese (Simplified)
- Chinese (Traditional)
- Japanese
- German
- Spanish
- Indonesian
- Vietnamese
- Portuguese (Brazil)

The language system is configured in `web/src/locales/config.ts` and language files are stored in separate files such as `en.ts`, `zh.ts`, etc.

### Theming

RAGFlow supports light and dark themes using a custom theme provider implementation. The theme system is built with:

- CSS variables for theme colors
- React context API for theme state management
- Local storage persistence for user preferences

Theme switching is available through the user settings interface, and the application respects system theme preferences with a "system" theme option.

### Main Features and Routes

The application is structured around these key sections:

1. **Knowledge Base Management**
   - Dataset creation and management (`/datasets`, `/dataset`)
   - Document upload and processing
   - Knowledge graph visualization (`/dataset/knowledge-graph/:id`)
   - Knowledge testing (`/dataset/testing/:id`)

2. **Chat Interfaces**
   - Chat list view (`/next-chats`)
   - Individual chat session (`/next-chat`)
   - Chat sharing (`/chat/share`)

3. **Search Features**
   - Search list (`/next-searches`)
   - Individual search interface (`/next-search`)

4. **Agent Workflows**
   - Agent list (`/agents`) 
   - Agent templates (`/agent-templates`)
   - Individual agent canvas (`/agent/:id`)
   - Flow visualization (`/flow/:id`)

5. **File Management**
   - File browser (`/files`)
   - Document viewer (`/document/:id`)

6. **User Settings**
   - Profile management (`/profile-setting/profile`)
   - Team management (`/profile-setting/team`)
   - Model configuration (`/profile-setting/model`)
   - MCP server settings (`/profile-setting/mcp`)
   - Prompt management (`/profile-setting/prompt`)

### API Integration

The frontend communicates with the backend through service modules:

- `chat-service.ts` - Chat functionality
- `knowledge-service.ts` - Knowledge base operations
- `agent-service.ts` - Agent canvas operations
- `user-service.ts` - User and authentication
- `file-manager-service.ts` - File management
- `mcp-server-service.ts` - MCP server integration
- `flow-service.ts` - Flow operations

## Backend API

The backend API provides services for the web frontend and other clients through a REST interface. It's built with Flask and follows a RESTful design pattern.

### Key Directories

- `api/apps/` - API application modules
- `api/db/` - Database models and utilities
- `api/utils/` - Utility functions

### API Endpoints

The API provides a comprehensive set of endpoints including:

1. **Authentication**
   - Token generation and management
   - User authentication

2. **Chat & Conversations**
   - `/new_conversation` - Create new conversation
   - `/completion` - Chat completion with LLMs
   - `/conversation/<conversation_id>` - Get conversation by ID

3. **Document Management**
   - `/document/upload` - Upload documents
   - `/document/upload_and_parse` - Upload and process documents
   - `/list_chunks` - List document chunks
   - `/get_chunk/<chunk_id>` - Get specific chunk
   - `/list_kb_docs` - List knowledge base documents
   - `/document/infos` - Get document information
   - `/document` (DELETE) - Remove documents

4. **Knowledge Retrieval**
   - `/retrieval` - Retrieve information from knowledge bases

5. **API Management**
   - `/new_token` - Create new API token
   - `/token_list` - List API tokens
   - `/stats` - Get usage statistics

### Database Models

The system uses a relational database with the following key models:

1. **User** - User account information
2. **Tenant** - Multi-tenant organization system
3. **Knowledgebase** - Knowledge bases for RAG
4. **Document** - Documents stored in knowledge bases
5. **Dialog** - Conversation systems
6. **Conversation** - User conversations
7. **UserCanvas** - Canvas workflows for agents
8. **APIToken** - API access tokens
9. **Search** - Search configurations
10. **MCPServer** - MCP server configurations
11. **File** - File management system

## Integration Points

The web frontend integrates with:

1. **LLM Services**
   - Various LLM providers (via model factories)
   - Text embedding models
   - Image-to-text models
   - ASR (Automatic Speech Recognition)

2. **Knowledge Management**
   - Knowledge bases for document storage and retrieval
   - Document processing pipelines
   - Vector search capabilities

3. **Agent System**
   - Canvas workflows for visual programming
   - Agent execution
   - Tool integration

4. **Search Services**
   - Full-text search
   - Vector search
   - Knowledge graph search

## Development

### Prerequisites

- Node.js (>= 18.20.4) and npm for frontend development
- Python for backend development
- Docker for containerized deployment

### Frontend Development

```bash
# Install dependencies
cd web
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run the API server
python -m api.ragflow_server
```

### Setup

The project can be run locally or deployed using Docker. Docker configuration files are available in the `docker/` directory.

## Deployment

The application can be deployed using Docker Compose or Kubernetes:

### Docker Compose

```bash
# Start with Docker Compose
docker-compose -f docker/docker-compose-base.yml up
```

### Kubernetes

Helm charts are available in the `helm/` directory for Kubernetes deployment.

## API Reference

The API provides endpoints for:

- User authentication and management
- Knowledge base operations
- Document processing and retrieval
- Conversation management
- Canvas workflow operations
- Search capabilities

## Configuration

Configuration options are available through:

- Environment variables
- Configuration files in the `conf/` directory
- Web application settings in `web/src/conf.json`

### Key Configuration Files

- `conf/service_conf.yaml` - Service configuration
- `conf/mapping.json` - API mappings
- `conf/llm_factories.json` - LLM provider configuration 