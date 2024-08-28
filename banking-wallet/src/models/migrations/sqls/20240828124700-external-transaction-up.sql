CREATE TABLE IF NOT EXISTS external_transactions (
    id uuid UNIQUE DEFAULT gen_random_uuid(),,
    type VARCHAR(50) NOT NULL, -- Deposit, withdrawal
    amount DECIMAL(10, 2) NOT NULL,
    wallet_id SERIAL REFERENCES wallets(id),
    user_id UUID,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    ref VARCHAR(50)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_wallet
      FOREIGN KEY (wallet_id)
      REFERENCES wallets (wallet_id)   
);