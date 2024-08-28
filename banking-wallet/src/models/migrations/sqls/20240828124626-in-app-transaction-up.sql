CREATE TABLE IF NOT EXISTS inapp_transactions (
    id uuid UNIQUE DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL, -- Peer-to-peer, product purchase, etc.
    amount DECIMAL(10, 2) NOT NULL,
    initiator_wallet_id SERIAL,
    destination_wallet_id SERIAL,
    initiator_user_id UUID,
    destination_user_id UUID,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_wallet_initiator
      FOREIGN KEY (initiator_wallet_id)
      REFERENCES wallets (wallet_id),
    CONSTRAINT fk_wallet_destination
      FOREIGN KEY (destination_wallet_id)
      REFERENCES wallets (wallet_id)
);