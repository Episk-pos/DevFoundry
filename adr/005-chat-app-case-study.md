# ADR 005: Chat App Case Study

## Status

Proposed

## Context

The existing lemonade stand case study serves its pedagogical purpose well - it demonstrates the I/O/P model, module organization, and progressive architectural complexity. However, it has limitations:

1. **Limited relatability** - Few learners have run lemonade stands; all use chat apps daily
2. **No natural interoperability story** - Lemonade stands don't communicate with each other
3. **Artificial networking concepts** - Adding client-server feels bolted on rather than essential
4. **Individual outcome** - Each learner ends with isolated, non-functional software

A chat application case study addresses these limitations while amplifying the curriculum's existing strengths in protocol thinking and collaboration.

## Decision

Replace the lemonade stand with a **chat application** as the primary case study that evolves through the curriculum. The chat app will follow the same pedagogical trajectory (CLI → Web → React → Fullstack → Deployed) while adding:

- **Natural protocol embodiment** - Chat IS message passing between actors
- **Real interoperability** - Participants can message each other
- **Tangible ownership** - Each person deploys their own infrastructure
- **Cohort network** - End result is a working communication network built by the group

## Trajectory

### Phase 1: Foundations (Part I)

#### Stage 0: Hello World Console
**Module 01 alignment: What Software Is**

```
Input: hardcoded message string
Processing: format with timestamp, sender
Output: display formatted message
```

Demonstrates the I/O/P model with the simplest possible chat interaction.

#### Stage 1: Chat CLI
**Module 02-04 alignment: Project Anatomy, Web Basics, Types**

Multi-file structure:
```
src/
├── index.js        # Entry point, CLI argument parsing
├── messages.js     # Message creation, formatting
├── users.js        # User identification
├── storage.js      # Local file persistence
├── display.js      # Console output formatting
└── types.ts        # (TypeScript version) Message, User, Conversation types
```

Key concepts:
- Module boundaries (same as lemonade stand)
- Local persistence (messages stored in JSON file)
- Type definitions for Message, User, Conversation
- Discriminated unions for message types (text, image, system, error)

Run with: `node src/index.js send "Hello world"` / `node src/index.js read`

#### Stage 2: Chat Static Web
**Module 03 alignment: How the Web Works**

Same business logic, browser I/O layer:
```
├── index.html      # Chat interface structure
├── styles.css      # Message bubbles, layout
└── js/
    ├── messages.js # Same logic as CLI
    ├── users.js
    ├── storage.js  # localStorage instead of file
    └── display.js  # DOM manipulation instead of console
```

Key concepts:
- I/O layer is the only thing that changes
- localStorage for persistence
- DOM events for user interaction
- Same message formatting logic works in both environments

### Phase 2: Modern Architecture (Part III)

#### Stage 3: Chat React SPA
**Module 13 alignment: React SPA**

Component structure:
```
src/
├── components/
│   ├── App.jsx
│   ├── MessageList.jsx
│   ├── MessageInput.jsx
│   ├── ConversationList.jsx
│   └── UserAvatar.jsx
├── hooks/
│   ├── useMessages.js
│   └── useConversations.js
├── services/
│   └── storage.js      # Still localStorage
└── types/
    └── index.ts
```

Key concepts:
- Component composition
- State management (useState, useReducer)
- Custom hooks for business logic
- Still entirely client-side (no server yet)

#### Stage 4: Chat Server (REST API)
**Module 14 alignment: Fullstack App**

```
server/
├── index.js            # Express server
├── routes/
│   ├── messages.js     # CRUD for messages
│   ├── conversations.js
│   └── users.js
├── db/
│   └── schema.sql      # SQLite tables
└── middleware/
    └── auth.js         # Basic auth (placeholder)

client/
└── (React SPA from Stage 3, now fetching from API)
```

**Critical milestone**: Multiple participants can now run their own servers. Each person has:
- Their own server instance
- Their own database
- Their own React client

But they're still isolated islands.

#### Stage 5: Real-time with WebSockets
**New concept introduction**

```
server/
├── ws/
│   └── handler.js      # WebSocket connection management
└── services/
    └── pubsub.js       # Message broadcasting

client/
├── hooks/
│   └── useWebSocket.js # Connection management
└── services/
    └── realtime.js     # Message subscription
```

Key concepts:
- Push vs poll
- Connection state management
- Reconnection strategies
- Message ordering and delivery guarantees

### Phase 3: Interoperability (New Material)

#### Stage 6: Protocol Specification
**Protocol Thinking in action**

Define a standard interface that any compliant implementation must support:

```typescript
// chat-protocol.ts - The Interface Segregation Principle in action

interface ChatServer {
  // Message operations
  sendMessage(message: OutboundMessage): Promise<MessageReceipt>;
  getMessages(conversationId: string, since?: Timestamp): Promise<Message[]>;

  // Conversation operations
  createConversation(participants: UserId[]): Promise<Conversation>;
  listConversations(userId: UserId): Promise<ConversationSummary[]>;

  // User operations
  registerUser(credentials: Credentials): Promise<User>;
  getUser(userId: UserId): Promise<User | null>;

  // Real-time (optional capability)
  subscribe?(conversationId: string): AsyncIterable<Message>;
}

interface ChatClient {
  // What any client must implement to work with any server
  connect(serverUrl: string): Promise<Connection>;
  authenticate(credentials: Credentials): Promise<Session>;
  send(message: OutboundMessage): Promise<void>;
  onMessage(handler: (message: Message) => void): void;
}
```

This stage teaches:
- **Interface Segregation Principle** - Define minimal contracts
- **Protocol design** - What messages, what responses, what errors
- **Versioning** - How protocols evolve without breaking
- **Documentation** - OpenAPI/AsyncAPI specifications

#### Stage 7: Cross-Server Communication
**Federation basics**

Participants' servers can now route messages to each other:

```
Alice's Server ←→ Bob's Server ←→ Carol's Server
     ↑                 ↑                ↑
Alice's Client    Bob's Client    Carol's Client
```

Implementation:
```javascript
// server/federation/router.js
async function routeMessage(message) {
  const recipient = await resolveUser(message.to);

  if (recipient.homeServer === THIS_SERVER) {
    // Local delivery
    return localDelivery(message);
  } else {
    // Federate to recipient's server
    return federatedDelivery(message, recipient.homeServer);
  }
}
```

Key concepts:
- User addressing (alice@server1.example.com)
- Server discovery
- Trust and verification
- Message signing

#### Stage 8: Authentication & Identity
**OAuth and auth concepts**

```
├── auth/
│   ├── strategies/
│   │   ├── local.js        # Username/password
│   │   ├── oauth-github.js # GitHub OAuth
│   │   └── oauth-google.js # Google OAuth
│   ├── session.js          # Session management
│   └── tokens.js           # JWT handling
```

Key concepts:
- Authentication vs authorization
- Session management
- OAuth flow walkthrough
- JWT tokens and claims
- Identity federation (use GitHub account across servers)

### Phase 4: Advanced Topics (Optional Extensions)

#### Stage 9: P2P Resilience
**GunDB integration**

```javascript
// services/gun-sync.js
import Gun from 'gun';

const gun = Gun(['https://relay1.example.com', 'https://relay2.example.com']);

// Messages sync across all connected peers
const messages = gun.get('conversations').get(conversationId);

messages.map().on((msg, id) => {
  // Handle incoming message from any peer
  handleMessage(msg);
});
```

Key concepts:
- Decentralization benefits and tradeoffs
- CRDTs and eventual consistency
- Offline-first architecture
- Peer discovery

#### Stage 10: End-to-End Encryption
**Privacy and security**

```javascript
// services/crypto.js
import { box, randomBytes } from 'tweetnacl';

function encryptMessage(message, recipientPublicKey, senderSecretKey) {
  const nonce = randomBytes(box.nonceLength);
  const encrypted = box(
    new TextEncoder().encode(message),
    nonce,
    recipientPublicKey,
    senderSecretKey
  );
  return { encrypted, nonce };
}
```

Key concepts:
- Public key cryptography basics
- Key exchange
- Perfect forward secrecy
- Trust on first use (TOFU)

## Pedagogical Benefits

### 1. Protocol Thinking Made Tangible
The chat app IS a protocol. Every message sent is protocol thinking in action. The existing mental model content becomes immediately applicable rather than abstract.

### 2. Natural Complexity Progression
| Stage | New Concept | Chat Implementation |
|-------|-------------|---------------------|
| CLI | I/O/P model | Message in → format → display |
| Web | DOM, events | Same logic, different I/O |
| React | Components, state | MessageList, useMessages |
| Server | HTTP, REST | POST /messages, GET /messages |
| WebSocket | Real-time | Push notifications |
| Federation | Protocols | Cross-server routing |
| Auth | Identity | OAuth, sessions |
| P2P | Decentralization | GunDB sync |

### 3. Real Interoperability
Unlike lemonade stands, chat apps SHOULD talk to each other. The case study naturally leads to:
- Defining interfaces (ISP)
- Testing interoperability
- Handling version mismatches
- Graceful degradation

### 4. Tangible Outcome
Each participant ends the curriculum with:
- **Their own chat server** they understand completely
- **Their own chat client** they can customize
- **Connection to cohort network** for real communication
- **Foundation for extension** (add features, deploy publicly)

### 5. Collaboration Opportunities
The case study creates natural collaboration points:
- Pair programming on protocol spec
- Code review of federation implementation
- Integration testing across implementations
- Collective debugging of interop issues

## Migration Path

### Parallel Development
Keep lemonade stand examples during transition. Chat app examples live alongside:

```
examples/
├── 00-hello-world-console/     # Unchanged
├── 01-lemonade-cli/            # Keep for reference
├── 02-lemonade-static-web/     # Keep for reference
├── 03-lemonade-cli-typescript/ # Keep for reference
├── 10-chat-console/            # New: Stage 0
├── 11-chat-cli/                # New: Stage 1
├── 12-chat-static-web/         # New: Stage 2
├── 13-chat-cli-typescript/     # New: Stage 1 (TypeScript)
├── 14-chat-react/              # New: Stage 3
├── 15-chat-fullstack/          # New: Stage 4
├── 16-chat-realtime/           # New: Stage 5
├── 17-chat-federated/          # New: Stage 6-7
└── 18-chat-p2p/                # New: Stage 9
```

### Module Updates Required
- **Module 01**: Update I/O/P examples to use messages
- **Module 02**: Project anatomy with chat-cli structure
- **Module 03**: HTTP concepts with chat message requests
- **Module 04**: Types with Message, User, Conversation definitions
- **Module 11-15**: Replace lemonade progression with chat progression
- **New content**: Federation, WebSockets, OAuth modules

## Technical Decisions

### Message Format
```typescript
interface Message {
  id: string;                    // UUID
  conversationId: string;        // UUID
  sender: UserId;                // user@server format
  recipients: UserId[];          // For group chats
  content: MessageContent;       // Discriminated union
  timestamp: ISO8601String;
  metadata: {
    edited?: ISO8601String;
    replyTo?: MessageId;
    reactions?: Reaction[];
  };
}

type MessageContent =
  | { type: 'text'; text: string }
  | { type: 'image'; url: string; alt?: string }
  | { type: 'file'; url: string; filename: string; size: number }
  | { type: 'system'; event: SystemEvent };
```

### Server Discovery
Use DNS SRV records or .well-known endpoints:
```
GET https://example.com/.well-known/chat-server
{
  "server": "chat.example.com",
  "version": "1.0",
  "capabilities": ["websocket", "federation", "e2ee"]
}
```

### Federation Protocol
REST-based for simplicity, with optional WebSocket upgrade:
```
POST /federation/messages
Authorization: Bearer <server-to-server-token>
{
  "from": "alice@server1.example.com",
  "to": "bob@server2.example.com",
  "message": { ... }
}
```

## Consequences

### Positive
- Dramatically more engaging case study
- Natural protocol thinking application
- Real interoperability between participants
- Tangible, deployable outcome
- Rich extension possibilities (encryption, P2P, mobile)
- Better preparation for real-world distributed systems

### Negative
- Significant content development required
- More complex infrastructure for cohort (multiple servers)
- Higher baseline complexity than lemonade stand
- Network concepts introduced earlier
- May overwhelm complete beginners

### Mitigations
- Keep early stages (console, CLI) very simple
- Provide clear "checkpoint" moments
- Offer lemonade stand as gentler alternative for struggling learners
- Create robust starter templates for each stage
- Document common issues and debugging strategies

## Open Questions

1. **Deployment platform**: Recommend specific hosting? (Railway, Fly.io, Render)
2. **Domain handling**: Each participant gets subdomain? Custom domains?
3. **Authentication defaults**: Start with local auth or OAuth from beginning?
4. **Mobile client**: Include React Native track?
5. **Matrix protocol**: Align with existing standard or create simpler educational version?

## References

- Matrix Protocol: https://spec.matrix.org/
- ActivityPub: https://www.w3.org/TR/activitypub/
- GunDB: https://gun.eco/
- Signal Protocol: https://signal.org/docs/

## Decision Outcome

[To be determined after cohort feedback]
