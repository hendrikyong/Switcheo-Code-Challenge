# Describing in detail how I would design a Transaction Broadcaster Service 
- You should focus on designing the software abstractions and architectural flow required to fulfill the service requirements, instead of choosing cloud services or software packages.
- Your submission will be graded on correctness, scalability, and robustness.

Client Request (API Layer)
    ↓
Transaction Validator → Validates Transaction
    ↓
Transaction Signer → Signs Transaction
    ↓
Transaction Pool → Stores Failed Transactions
    ↓
Transaction Dispatcher → Sends Transaction to Blockchain Network
    ↓
Retry Handler → Handles Failures and Retries if needed
    ↓
Blockchain Network → Receives Transaction
    ↓
Confirmation → Updates Status (Success or Failure)
    ↓
API Layer → Notifies Client
