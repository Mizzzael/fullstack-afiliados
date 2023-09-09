import TransactionTypes from '../../domain/values/type';

const TransactionTypeByNumber = (typeNumber: number) => {
  switch (typeNumber) {
    case 1:
      return {
        multiple: 1,
        type: TransactionTypes.PRODUCER_SALE,
      };
    case 2:
      return {
        multiple: 1,
        type: TransactionTypes.AFFILIATE_SELLING,
      };
    case 3:
      return {
        multiple: -1,
        type: TransactionTypes.COMMISSION_PAID,
      };
    default:
      return {
        multiple: 1,
        type: TransactionTypes.COMMISSION_RECEIVED,
      };
  }
};

export default TransactionTypeByNumber;
