
export enum NodeStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  IDLE = 'IDLE',
  WORKING = 'WORKING'
}

export enum NodeGrade {
  LIGHT = 'LIGHT',
  MID = 'MID',
  HEAVY = 'HEAVY'
}

export interface Cluster {
  id: string;
  name: string;
  model: string;
  nodeCount: number;
  gpuType: string;
  vramRequired: number;
  status: 'ACTIVE' | 'DEPLOYING';
}

export interface EarningRecord {
  id: string;
  nodeId: string;
  tokens: number;
  timestamp: string;
  amount: number;
  type: 'FLUX' | 'CREDIT';
}

export interface NodeStats {
  gpu: string;
  vram: number;
  grade: NodeGrade;
  utilization: number[];
  vramUsage: number;
  ping: number;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  maskedKey: string;
  createdAt: string;
  lastUsed: string;
  status: 'ACTIVE' | 'REVOKED';
}

export interface PricingModel {
  name: string;
  category: string;
  inputPrice: number; // USD per 1M tokens
  outputPrice: number; // USD per 1M tokens
  note: string;
  company: {
    name: string;
    color: string;
    initial: string;
  };
  isP2P?: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  channel: 'USDC' | 'FLUX';
}
