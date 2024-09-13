CREATE TABLE IF NOT EXISTS balance_history (
    id SERIAL UNIQUE PRIMARY KEY,
    wallet_id SERIAL,
    user_id uuid NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    balance_before DECIMAL(12, 2) NOT NULL,
    type VARCHAR(255) NOT NULL,
    created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_wallet
      foreign key (wallet_id)
      REFERENCES wallets (wallet_id)
);