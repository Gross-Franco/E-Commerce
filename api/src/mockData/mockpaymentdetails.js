const mockpaymentdetails = [
    {
        "amount": 30,
        "provider": "Adyen",
        "status": "Pending",
        "paymentType": "Credit Card",
    },
    {
        "amount": 15,
        "provider": "Braintree",
        "status": "Refunded",
        "paymentType": "Credit Card",
    },
    {
        "amount": 20,
        "provider": "PayPal",
        "status": "Revoked",
        "paymentType": "Debit Card",
    },
    {
        "amount": 40,
        "provider": "Stripe",
        "status": "Complete",
        "paymentType": "Debit Card",
    },
]

module.exports = {
    mockpaymentdetails 
}
