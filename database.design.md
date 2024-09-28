
## Base
#### Columns
- id: uuid
- created_at: timestamp
- updated_at: timestamp
- metadata: jsonb
<!-- - deleted_at: timestamp -->

## User < Base
#### Relations
- Company: 1:1
#### Columns
- id: uuid
- username: string
- email: string
- password: string
- superuser: boolean

## Company < Base
#### Relations
- User: 1:1
- Offers: 1:n
- OfferResponses: 1:n
#### Columns
- id: uuid
- name: string
- description: string
- user_id: uuid


## Offer < Base
#### Relations
- Company: n:1
- OfferResponses: 1:n
#### Columns
- id: uuid
- title: string
- description: string
- company_id: uuid

## OfferResponse < Base
#### Relations
- Offer: n:1
- Company: n:1
#### Columns
- id: uuid
- offer_id: uuid
- company_id: uuid
- message: string
- status: enum
