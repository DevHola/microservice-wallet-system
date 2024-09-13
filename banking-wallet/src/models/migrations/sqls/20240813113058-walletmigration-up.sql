CREATE TABLE IF NOT EXISTS wallets (
  wallet_id SERIAL UNIQUE PRIMARY KEY,
  Balance DECIMAL(12, 2) NOT NULL DEFAULT 0,
  wallet_address VARCHAR(255) UNIQUE NOT NULL,
  user_id uuid,
  wallet_type_id SERIAL,
  pin VARCHAR(255) DEFAULT NULL,
  is_blocked BOOLEAN NOT NULL DEFAULT true,
  is_setup_complete BOOLEAN NOT NULL DEFAULT false,
  created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_wallet_type
    foreign key (wallet_type_id)
    REFERENCES wallet_type (wallet_type_id)
);