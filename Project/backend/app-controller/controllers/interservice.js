const User = require("../models/user");

exports.matchAddress = async (req, res, next) => {
  const { companyName } = req.body;

  try {
    const user = await User.findOne({ companyName: companyName });

    if (user) {
      return res.status(200).json({
        address: user.address,
      });
    } else {
      return res
        .status(404)
        .json({ errorMessage: "User with given address doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ errorMessage: "Error finding user" });
  }
};

exports.matchCompanyNames = async (req, res, next) => {
  const { transactions } = req.body;
  try {
    const newTransactions = [];
    await Promise.all(
      transactions.map(async (transaction) => {
        const senderUser = await User.findOne({ address: transaction.sender });
        const receiverUser = await User.findOne({
          address: transaction.receiver,
        });

        const newTransaction = {
          sender: senderUser.companyName,
          receiver: receiverUser.companyName,
          productStatus: transaction.productStatus,
          transactionDate: transaction.transactionDate.slice(0, 10),
        };
        newTransactions.push(newTransaction);
      })
    );

    return res.status(200).json({
      transactions: newTransactions,
    });
  } catch (error) {
    return res.status(500).json({ errorMessage: "Error finding user" });
  }
};
