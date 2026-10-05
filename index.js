document.addEventListener("DOMContentLoaded", function () {

  // Get elements from the HTML
  const form = document.querySelector("#mortgageForm");

  const amountInput = document.querySelector("#amount");
  const termInput = document.querySelector("#term");
  const rateInput = document.querySelector("#rate");

  const repaymentRadio = document.querySelector(
    'input[value="repayment"]'
  );

  const interestRadio = document.querySelector(
    'input[value="interest"]'
  );

  const resultDiv = document.querySelector("#result");
  const clearBtn = document.querySelector("#clearBtn");


  // Calculate mortgage
  form.addEventListener("submit", function (event) {

    // Prevent the browser from submitting the form
    event.preventDefault();

    // Get values from inputs
    const principal = Number(amountInput.value);
    const years = Number(termInput.value);
    const annualRate = Number(rateInput.value);


    // Validate inputs
    if (
      principal <= 0 ||
      years <= 0 ||
      annualRate < 0
    ) {
      resultDiv.innerHTML = `
        <h2>Please enter valid values.</h2>
        <p>All fields are required.</p>
      `;

      return;
    }


    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment;


    // Repayment mortgage
    if (repaymentRadio.checked) {

      // Special case: 0% interest
      if (monthlyRate === 0) {

        monthlyPayment = principal / months;

      } else {

        const factor = Math.pow(
          1 + monthlyRate,
          months
        );

        monthlyPayment =
          principal *
          (monthlyRate * factor) /
          (factor - 1);
      }

    }


    // Interest-only mortgage
    else if (interestRadio.checked) {

      monthlyPayment =
        (principal * (annualRate / 100)) / 12;
    }


    // Format the result
    const formattedPayment =
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2
      }).format(monthlyPayment);


    // Display result
    resultDiv.innerHTML = `
      <div>
        <h2>Estimated Monthly Payment</h2>

        <h1>${formattedPayment}</h1>

        <p>
          ${
            repaymentRadio.checked
              ? "Repayment Mortgage"
              : "Interest Only Mortgage"
          }
        </p>
      </div>
    `;

  });


  // Clear All
  clearBtn.addEventListener("click", function () {

    // Restore the default result
    resultDiv.innerHTML = `
      <img
        src="./assets/empty.png"
        alt="No result"
        width="40%"
      />

      <h2>Results shown here</h2>
    `;

  });

});