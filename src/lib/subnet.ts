export interface SubnetResult {
  network: string;
  broadcast: string;
  hostMin: string;
  hostMax: string;
  prefix: number;
  mask: string;
  hostCount: number;
  usableHosts: number;
}

const MAX_IP = 4294967295;

function fail(msg: string): never {
  throw new Error(msg);
}

function parseIP(ip: string): number {
  if (typeof ip !== 'string' || !/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) {
    fail(`Invalid IPv4 address: ${ip}`);
  }
  const parts = ip.split('.').map((n) => Number(n));
  if (parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    fail(`Invalid IPv4 address: ${ip}`);
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function parseCIDR(cidr: number): number {
  if (!Number.isInteger(cidr) || cidr < 0 || cidr > 32) {
    fail(`Invalid CIDR prefix: ${cidr}`);
  }
  return cidr;
}

function formatIP(n: number): string {
  return [24, 16, 8, 0].map((shift) => ((n >>> 0) >>> shift) & 0xff).join('.');
}

export function calculateSubnet(ip: string, cidr: number): SubnetResult {
  const ipInt = parseIP(ip);
  const prefix = parseCIDR(cidr);

  const bits = 32 - prefix;
  const mask = prefix === 0 ? 0 : ((0xffffffff << bits) >>> 0);
  const network = (ipInt & mask) >>> 0;
  const hostBits = MAX_IP - mask;
  const broadcast = (network + hostBits) >>> 0;

  const hostCount = broadcast - network + 1;
  const usableHosts = hostCount > 2 ? hostCount - 2 : hostCount;
  const hostMin = hostCount === 2 ? network : hostCount <= 1 ? ipInt : network + 1;
  const hostMax = hostCount === 2 ? broadcast : hostCount <= 1 ? ipInt : broadcast - 1;

  return {
    network: formatIP(network),
    broadcast: formatIP(broadcast),
    hostMin: formatIP(hostMin),
    hostMax: formatIP(hostMax),
    prefix,
    mask: formatIP(mask),
    hostCount,
    usableHosts,
  };
}
