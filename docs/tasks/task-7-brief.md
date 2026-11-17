## Task 7: Playground (Subnet Calculator)

**Files:**
- Create: `src/lib/subnet.ts`, `src/components/playground/SubnetCalculator.tsx`, `src/app/playground/page.tsx`, `src/app/playground/[slug]/page.tsx`, `src/app/admin/playground/page.tsx`, `src/actions/playground.ts`
- Create: `tests/unit/subnet.test.ts`

**Interfaces:**
- Produces: `calculateSubnet(ip, cidr)` returning network, broadcast, mask, host range, host count; `listWidgets()`, `createWidget`, `deleteWidget`.

- [ ] **Step 1: Write failing subnet tests** (e.g., `192.168.1.0/24` → network 192.168.1.0, broadcast 192.168.1.255, hosts 254; `/30` → 2 hosts; invalid IP → error).

- [ ] **Step 2: Run tests → FAIL**

- [ ] **Step 3: Implement `src/lib/subnet.ts`** (pure function, no deps, handle IPv4; throw on invalid).

- [ ] **Step 4: Run tests → PASS**

- [ ] **Step 5: Build SubnetCalculator component** (inputs IP + CIDR slider/select, live result, copy-to-clipboard).

- [ ] **Step 6: Wire playground pages + admin manage (add/remove widget, reorder).**

- [ ] **Step 7: Seed subnet-calculator widget.**

- [ ] **Step 8: Commit**

