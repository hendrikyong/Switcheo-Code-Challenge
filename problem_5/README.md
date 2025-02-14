# Consensus Breaking Change

## 1. Explain what does it mean by breaking consensus.

- A consensus breaking change is a change in the blockchain rules that makes the current state of the network incompatible with previous versions. This requires everyone to upgrade their software client so that a consensus is maintained. so breaking consensus means that those who do not upgrade their software cannot be in sync with the blockchain

## 2. Explain why your change would break the consensus.
- Change would break consensus because it modifies the rules that govern how blocks and transactions are validated. 
- Nodes running the old version would not recognize or accept blocks produced under the new rules, causing them to fall out of sync with the upgraded network. 
- This can result in a hard fork, where the blockchain splits into two incompatible versions. Such changes typically involve alterations to block structure, transaction validation, cryptographic mechanisms, gas calculations, or opcode behavior. Without a network-wide upgrade, nodes following different rules will no longer agree on the valid state of the blockchain.  
