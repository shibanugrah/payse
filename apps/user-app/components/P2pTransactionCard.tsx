import { Card } from "@repo/ui/card";

export const P2pTransactionCard = ({
  transactions,
}: {
  transactions: {
    sender: string;
    recipient: string;
    time: string;
    amount: number;
  }[];
}) => {
  return (
    <Card title={"Recent Transactions"}>
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className="flex justify-between border-b border-slate-300 py-2 last:border-0"
        >
          <div>
            {/* Sender and recipient details */}
            <div className="font-medium">
              {transaction.sender} ➡️ {transaction.recipient}
            </div>
            {/* Timestamp */}
            <div className="text-sm text-slate-500">{transaction.time}</div>
          </div>
          {/* Amount */}
          <div className="font-semibold text-green-600">
            + ₹{transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </Card>
  );
};
