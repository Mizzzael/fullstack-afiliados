import UserEntity from '../../../User/domain/entities/user.entity';
import TransactionTypeByNumber from './transactionTypeByNumber';
import TransactionDto from '../dto/transaction.dto';

const CreateTransactionByString = (
  user: UserEntity,
  transactionItem: string,
): TransactionDto => {
  const transaction = new TransactionDto();
  const type = transactionItem.substring(0, 1);
  const parseType = TransactionTypeByNumber(parseInt(type.trim()));
  const dateString = transactionItem.substring(1, 26).trim();
  const productName = transactionItem.substring(26, 56).trim();
  const productValue =
    (parseType.multiple * parseInt(transactionItem.substring(56, 66).trim())) /
    100;
  const sellerName = transactionItem.substring(66, 87).trim();

  transaction.user = user;
  transaction.type = parseType.type;
  transaction.date = new Date(dateString);
  transaction.value = productValue;
  transaction.product = productName;
  transaction.seller = sellerName;
  return transaction;
};

export default CreateTransactionByString;
