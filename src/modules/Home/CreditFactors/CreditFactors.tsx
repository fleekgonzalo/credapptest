import CreditFactor from "./CreditFactor";

export const CreditFactors = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
      <CreditFactor
        link="#"
        primaryText="Length of credit history"
        secondaryText="You have a solid history of using lending products and this factor has a high impact on your score."
        variant="green"
      />
      <CreditFactor
        link="#"
        primaryText="New credit"
        secondaryText="You’ve recently taken some new loans which have a moderate impact on your score."
        variant="yellow"
      />
      <CreditFactor
        link="#"
        primaryText="Credit mix"
        secondaryText="You’ve used four lending pools in the past 12 months.  This factor has a low impact on your score."
        variant="green"
      />
      <CreditFactor
        link="#"
        primaryText="Payment history"
        secondaryText="You actively manage your debts to ensure they stay healthy.  This factor has a high impact on your score."
        variant="green"
      />
      <CreditFactor
        link="#"
        primaryText="Amounts owed"
        secondaryText="You’re only using 2% of your available credit.  This factor has a high impact on your score."
        variant="green"
      />
      <CreditFactor
        link="#"
        primaryText="Credit age"
        secondaryText="The oldest borrowing event was 24 months ago.  This factor has a moderate impact on your score."
        variant="green"
      />
    </div>
  );
};

export default CreditFactors;
