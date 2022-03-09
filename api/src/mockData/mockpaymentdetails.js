const mockpaymentdetails = [
    {
        "amount": 30,
        "provider": "Adyen",
        "status": "Pending",
    },
    {
        "amount": 15,
        "provider": "Braintree",
        "status": "Refunded",
    },
    {
        "amount": 20,
        "provider": "PayPal",
        "status": "Revoked",
    },
    {
        "amount": 40,
        "provider": "Stripe",
        "status": "Complete",
    },
]

module.exports = {
    mockpaymentdetails 
}
