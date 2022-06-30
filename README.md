# Microservices-Ticketing-App

### Resource types
User
Name        | Type
------------|-------
Email       | String
Password    | String

Ticket 
Name        | Type
------------|-------
Title       | String
Price       | Number
userId      | Ref to User (who is selling ticket)
orderId     | Ref to Order (purchase attempt)

Order
Name        | Type
------------|-------
userId      | Ref to User (person creating order)
Status      | Created, Cancelled, AwaitingPayment, Completed
tickerId    | Ref to Ticket
expiresAt   | Date


Charge
Name            | Type
----------------|-------
orderId         | Ref to Order
Status          | Created, Fialed, Completed
Amount          | Number
stripeId        | String
stripeRefundId  | String

### Services
- Auth: related to user auth (signup/signin/signout)
- Tickets: creating/editing. Knows whether a ticker can be updated
- Orders: order creation/editing
- Expiration: watches for orders to be created; cancels after XXX minutes
- Payments: handles credit card payments. Cancels if payment fails; completes if payment succeeds (order status changes as well)

Essentially one service is created for each resource. 

### Events
- Users: UserCreated, UserUpdated
- Order: OrderCreated, OrderCancelled, OrderExpired
- Ticket: TicketCreated, TicketUpdated
- Charge: ChargeCreated

### Routes
Auth
Route                     | Method | Body                    | Purpose
--------------------------|--------|-------------------------|--------------
/api/v1/users/signup      | POST   | {email: S, passowrd: S} | Sign up for acc
/api/v1/users/signin      | POST   | same                    | Sign in for existing acc
/api/v1/users/signout     | POST   | {}                      | Sign out
/api/v1/users/currentuser | GET    | -                       | Return info about user


