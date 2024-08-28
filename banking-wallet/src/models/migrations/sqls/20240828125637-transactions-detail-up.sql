CREATE TABLE IF NOT EXISTS transaction_details   
 (
    id SERIAL UNIQUE PRIMARY KEY,
    transaction_id uuid REFERENCES inapp_transactions(id) OR REFERENCES external_transactions(id),
    details JSONB
);