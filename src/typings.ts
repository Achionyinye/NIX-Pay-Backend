type DataBase = {
    "transactions": Transactions,
    "balances": Balances
}

type Transactions = [Transaction]

type Transaction = {
    "reference": number, 
    "senderAccount": number,
    "amount": number,
    "receiverAccount": number, 
    "transferDescription": string,
    "createdAt": string,
}

type Balances = [Balance] 


type Balance = {
    "account": number, 
    "balance": number,
    "createdAt": string
}

type TransferInfo = {
    "from": number,
    "to": number,
    "amount": number,
    "transferDescription": string
}