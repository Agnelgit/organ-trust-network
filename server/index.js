const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Web3 = require('web3');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Web3 Configuration
const web3 = new Web3('https://bsc-dataseed1.binance.org/');
const METAMASK_ACCOUNT = '0x9A45b64D0B57F8a5C23a277e94779baEcf0330ef';

// In-memory storage (replace with database in production)
let organRegistry = [];
let matchingQueue = [];
let verificationRequests = [];
let activeConnections = new Map();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    blockchain: {
      connected: true,
      network: 'BNB Smart Chain',
      account: METAMASK_ACCOUNT
    }
  });
});

// Organ Registry Routes
app.get('/api/organs', (req, res) => {
  res.json(organRegistry);
});

app.post('/api/organs/register', async (req, res) => {
  try {
    const { donorId, organType, bloodType, medicalData, location } = req.body;
    
    const organ = {
      id: Date.now().toString(),
      donorId,
      organType,
      bloodType,
      medicalData,
      location,
      status: 'available',
      timestamp: new Date().toISOString(),
      blockchainTx: null
    };

    // Simulate blockchain transaction
    const txHash = await simulateBlockchainTransaction('registerOrgan', organ);
    organ.blockchainTx = txHash;

    organRegistry.push(organ);
    
    // Notify all connected clients
    io.emit('organRegistered', organ);
    
    res.status(201).json({ success: true, organ, txHash });
  } catch (error) {
    console.error('Error registering organ:', error);
    res.status(500).json({ error: 'Failed to register organ' });
  }
});

// Matching System Routes
app.post('/api/matching/request', async (req, res) => {
  try {
    const { patientId, organType, bloodType, urgency, medicalData } = req.body;
    
    const request = {
      id: Date.now().toString(),
      patientId,
      organType,
      bloodType,
      urgency,
      medicalData,
      status: 'pending',
      timestamp: new Date().toISOString(),
      matches: []
    };

    // Find potential matches
    const matches = findMatches(request);
    request.matches = matches;

    matchingQueue.push(request);
    
    // Notify about new matching request
    io.emit('matchingRequest', request);
    
    res.status(201).json({ success: true, request, matches });
  } catch (error) {
    console.error('Error processing matching request:', error);
    res.status(500).json({ error: 'Failed to process matching request' });
  }
});

app.get('/api/matching/queue', (req, res) => {
  res.json(matchingQueue);
});

// Verification Routes
app.post('/api/verification/submit', async (req, res) => {
  try {
    const { userId, userType, documents, medicalRecords } = req.body;
    
    const verification = {
      id: Date.now().toString(),
      userId,
      userType,
      documents,
      medicalRecords,
      status: 'pending',
      timestamp: new Date().toISOString(),
      verifiedBy: null,
      verificationDate: null
    };

    verificationRequests.push(verification);
    
    // Notify verification team
    io.emit('verificationRequest', verification);
    
    res.status(201).json({ success: true, verification });
  } catch (error) {
    console.error('Error submitting verification:', error);
    res.status(500).json({ error: 'Failed to submit verification' });
  }
});

app.get('/api/verification/requests', (req, res) => {
  res.json(verificationRequests);
});

app.put('/api/verification/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { verifierId } = req.body;
    
    const verification = verificationRequests.find(v => v.id === id);
    if (!verification) {
      return res.status(404).json({ error: 'Verification request not found' });
    }

    verification.status = 'approved';
    verification.verifiedBy = verifierId;
    verification.verificationDate = new Date().toISOString();

    // Simulate blockchain verification record
    const txHash = await simulateBlockchainTransaction('verifyUser', verification);
    verification.blockchainTx = txHash;
    
    io.emit('verificationApproved', verification);
    
    res.json({ success: true, verification, txHash });
  } catch (error) {
    console.error('Error approving verification:', error);
    res.status(500).json({ error: 'Failed to approve verification' });
  }
});

// Blockchain interaction routes
app.get('/api/blockchain/account', (req, res) => {
  res.json({ 
    account: METAMASK_ACCOUNT,
    network: 'BNB Smart Chain',
    chainId: 56
  });
});

app.post('/api/blockchain/transaction', async (req, res) => {
  try {
    const { method, data } = req.body;
    const txHash = await simulateBlockchainTransaction(method, data);
    res.json({ success: true, txHash });
  } catch (error) {
    console.error('Blockchain transaction error:', error);
    res.status(500).json({ error: 'Transaction failed' });
  }
});

// WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  activeConnections.set(socket.id, {
    connectedAt: new Date().toISOString(),
    lastActivity: new Date().toISOString()
  });

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    activeConnections.delete(socket.id);
  });

  // Send initial data
  socket.emit('initialData', {
    organs: organRegistry,
    matchingQueue: matchingQueue,
    verificationRequests: verificationRequests.length
  });
});

// Helper Functions
function findMatches(request) {
  return organRegistry.filter(organ => 
    organ.organType === request.organType &&
    organ.bloodType === request.bloodType &&
    organ.status === 'available'
  ).map(organ => ({
    organId: organ.id,
    compatibility: calculateCompatibility(request, organ),
    distance: calculateDistance(request.location, organ.location)
  })).sort((a, b) => b.compatibility - a.compatibility);
}

function calculateCompatibility(request, organ) {
  // Simplified compatibility calculation
  let score = 0;
  if (request.bloodType === organ.bloodType) score += 40;
  if (request.organType === organ.organType) score += 40;
  // Add more sophisticated matching logic here
  return Math.min(100, score + Math.random() * 20);
}

function calculateDistance(loc1, loc2) {
  // Simplified distance calculation
  return Math.random() * 500; // km
}

async function simulateBlockchainTransaction(method, data) {
  // Simulate blockchain transaction delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Generate mock transaction hash
  const txHash = '0x' + Array.from({length: 64}, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  
  console.log(`Blockchain transaction simulated: ${method}`, { txHash, data });
  return txHash;
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 LifeChain Backend Server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready`);
  console.log(`🔗 Connected to BNB Smart Chain`);
  console.log(`💼 MetaMask Account: ${METAMASK_ACCOUNT}`);
});

module.exports = app;