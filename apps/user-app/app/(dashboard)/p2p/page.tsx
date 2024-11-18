import { SendCard } from "../../../components/SendCard";
import { P2pTransactionCard } from "../../../components/P2pTransactionCard";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";

// Function to fetch P2P transactions for the logged-in user
async function getP2pTransfers() {
    const session = await getServerSession(authOptions);

    // Check if the user is logged in
    if (!session?.user?.id) {
        return [];
    }

    // Fetch transactions where the user is either sender or recipient
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session.user.id) },
                { toUserId: Number(session.user.id) }
            ]
        },
        include: {
            fromUser: true, // Include sender details
            toUser: true    // Include recipient details
        }
    });

    // Map transactions into the desired format for the P2pTransactionCard
    return txns.map((txn) => ({
        time: txn.timestamp.toISOString(),   // Format timestamp for serialization
        amount: txn.amount / 100,           // Convert amount from integer to decimal
        sender: txn.fromUser.name || txn.fromUser.email || "Unknown Sender",
        recipient: txn.toUser.name || txn.toUser.email || "Unknown Recipient"
    }));
}

// P2P Transfer Page Component
export default async function P2PTransferPage() {
    const transactions = await getP2pTransfers();

    return (
        <div className="w-full">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transfer
            </div>
            <div className="w-full flex justify-between p-4">
                {/* SendCard on the left */}
                <div className="w-1/2 pr-2">
                    <SendCard />
                </div>
                {/* P2P Transaction Card on the right */}
                <div className="w-1/2 pl-2">
                    {transactions.length === 0 ? (
                        <div className="text-gray-500">No recent transactions</div>
                    ) : (
                        <P2pTransactionCard transactions={transactions} />
                    )}
                </div>
            </div>
        </div>
    );
}
