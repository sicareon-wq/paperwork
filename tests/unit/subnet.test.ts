import { describe, it, expect } from 'vitest';
import { calculateSubnet } from '@/lib/subnet';

describe('calculateSubnet', () => {
  it('192.168.1.0/24 -> network 192.168.1.0, broadcast 192.168.1.255, usable 254', () => {
    const r = calculateSubnet('192.168.1.0', 24);
    expect(r.network).toBe('192.168.1.0');
    expect(r.broadcast).toBe('192.168.1.255');
    expect(r.hostMin).toBe('192.168.1.1');
    expect(r.hostMax).toBe('192.168.1.254');
    expect(r.hostCount).toBe(256);
    expect(r.usableHosts).toBe(254);
  });

  it('10.0.0.1/30 -> 2 usable hosts', () => {
    const r = calculateSubnet('10.0.0.1', 30);
    expect(r.network).toBe('10.0.0.0');
    expect(r.broadcast).toBe('10.0.0.3');
    expect(r.hostMin).toBe('10.0.0.1');
    expect(r.hostMax).toBe('10.0.0.2');
    expect(r.hostCount).toBe(4);
    expect(r.usableHosts).toBe(2);
  });

  it('10.0.0.0/8 -> network 10.0.0.0, broadcast 10.255.255.255, 16777214 usable', () => {
    const r = calculateSubnet('10.0.0.0', 8);
    expect(r.network).toBe('10.0.0.0');
    expect(r.broadcast).toBe('10.255.255.255');
    expect(r.hostCount).toBe(16777216);
    expect(r.usableHosts).toBe(16777214);
  });

  it('192.168.1.1/24 -> network 192.168.1.0', () => {
    const r = calculateSubnet('192.168.1.1', 24);
    expect(r.network).toBe('192.168.1.0');
    expect(r.broadcast).toBe('192.168.1.255');
  });

  it('255.255.255.255/32 -> single host', () => {
    const r = calculateSubnet('255.255.255.255', 32);
    expect(r.network).toBe('255.255.255.255');
    expect(r.broadcast).toBe('255.255.255.255');
    expect(r.hostMin).toBe('255.255.255.255');
    expect(r.hostMax).toBe('255.255.255.255');
    expect(r.hostCount).toBe(1);
    expect(r.usableHosts).toBe(1);
  });

  it('0.0.0.0/0 -> full range', () => {
    const r = calculateSubnet('0.0.0.0', 0);
    expect(r.network).toBe('0.0.0.0');
    expect(r.broadcast).toBe('255.255.255.255');
    expect(r.hostCount).toBe(4294967296);
    expect(r.usableHosts).toBe(4294967294);
  });

  it('invalid IP throws', () => {
    expect(() => calculateSubnet('300.1.1.1', 24)).toThrow();
    expect(() => calculateSubnet('192.168.1.0', 99)).toThrow();
    expect(() => calculateSubnet('192.168.1', 24)).toThrow();
    expect(() => calculateSubnet('192.168.1.0.0', 24)).toThrow();
    expect(() => calculateSubnet('192.168.1.0', -1)).toThrow();
    expect(() => calculateSubnet('192.168.1.0', 0.5)).toThrow();
  });

  it('mask is dotted decimal', () => {
    const r = calculateSubnet('10.0.0.0', 24);
    expect(r.mask).toBe('255.255.255.0');
    expect(r.prefix).toBe(24);
  });
});
