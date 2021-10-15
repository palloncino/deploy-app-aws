export interface IExpensesProps {
  handleInputChange: (name: string, value: string | number) => void;
  handleSubmit: () => void;
  handleClear: () => void;
  handleDeleteCard: (id: string) => void;
  expensesData: IExpenses;
  currentInputs: any; // TODO: interface
  isLoading?: boolean;
}

export interface IExpenses {
  [key: string]: {
    label: string;
    url: string;
    price: number;
    period: number;
    details: string;
    renewalDay: string;
  };
}
