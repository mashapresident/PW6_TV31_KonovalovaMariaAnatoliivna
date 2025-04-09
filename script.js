document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("calc-form");
    const output = document.getElementById("output");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Отримання даних з форми
      const efficiency = parseFloat(document.getElementById("efficiency").value);
      const cosPhi = parseFloat(document.getElementById("cos-phi").value);
      const voltage = parseFloat(document.getElementById("voltage").value);
      const numUnits = parseInt(document.getElementById("num-units").value, 10);
      const nominalPower = parseFloat(document.getElementById("nominal-power").value);
      const utilizationFactor = parseFloat(document.getElementById("utilization-factor").value);
      const reactiveFactor = parseFloat(document.getElementById("reactive-factor").value);
  
      // Валідація даних
      if (
        efficiency <= 0 || efficiency > 1 ||
        cosPhi <= 0 || cosPhi > 1 ||
        voltage <= 0 || numUnits <= 0 ||
        nominalPower <= 0 || utilizationFactor <= 0 || utilizationFactor > 1 ||
        reactiveFactor <= 0
      ) {
        output.textContent = "Усі значення повинні бути невід'ємними та відповідати їх діапазонам!";
        return;
      }
  
      // Розрахунки
      const totalNominalPower = numUnits * nominalPower;
      const activePower = totalNominalPower * utilizationFactor;
      const reactivePower = activePower * reactiveFactor;
      const apparentPower = Math.sqrt(activePower ** 2 + reactivePower ** 2);
      const current = (activePower * 1000) / (voltage * cosPhi);
  
      // Вивід результатів
      output.innerHTML = `
        <strong>Розрахункові результати:</strong><br>
        Загальна номінальна потужність: ${totalNominalPower.toFixed(2)} кВт<br>
        Активна потужність: ${activePower.toFixed(2)} кВт<br>
        Реактивна потужність: ${reactivePower.toFixed(2)} квар<br>
        Повна потужність: ${apparentPower.toFixed(2)} кВ·А<br>
        Розрахунковий струм: ${current.toFixed(2)} А
      `;
    });
  });
  