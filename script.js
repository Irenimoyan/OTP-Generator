const inputs = document.querySelectorAll(".input"),
    button = document.querySelector("button"),
    mobile = document.getElementById('mobile'),
    expire = document.getElementById('expire');

// generateOTPs
function generateOTPs() {
  OTP =
    Math.floor(Math.random() * 10) +
    "" +
    Math.floor(Math.random() * 10) +
    "" +
    Math.floor(Math.random() * 10) +
    "" +
    Math.floor(Math.random() * 10)

  alert("Your OTP is:" + OTP)

  inputs[0].focus() // Move the focus to the first input field at the beginning of the function

  expire.innerText = 10;
  expireInterval = setInterval(function () {
    expire.innerText--
    if (expire.innerText == 0) {
      clearInterval(expireInterval)
    }
  }, 1000)
}

function clearOTPs() {
  inputs.forEach((inputs, i) => {
    inputs.value = ""
    if (i == 0) {
      inputs.removeAttribute("disabled")
    }
    if (i !== 0) {
      inputs.setAttribute("disabled", true)
    }
  })

  clearInterval(expireInterval)
  expire.innerText = 0
  button.classList.remove("active")
}

inputs.forEach((inputs, index) => {
  console.log(inputs)
  inputs.addEventListener("keyup", function (e) {
    const currentInput = inputs,
      nextInput = inputs.nextElementSibling,
      prevInput = inputs.previousElementSibling;

    if (
      nextInput &&
      nextInput.hasAttribute("disabled") &&
      currentInput.value !== ""
    ) {
      nextInput.removeAttribute("disabled")
      nextInput.focus()
    }

    if (e.key === "Backspace") {
      inputs.forEach((inputs, index1) => {
        if (index <= index1 && prevInput) {
          inputs.setAttribute("disabled", true)
        }
      })
    }

    if (!inputs[3].disabled && inputs[3].value !== "") {
      inputs[3].blur()
      button.classList.add("active")
      return
    }
    button.classList.remove("active")
  })
})

window.addEventListener("load", () => {
  let x = prompt("Please enter your mobile number to verify your account")
  if (x) {
    mobile.innerText = x
  }
  generateOTPs() // Call the generateOTPs function after setting the mobile number
})

button.addEventListener("click", () => {
  let verify = ""
  inputs.forEach((input) => {
    verify += input.value
  })
  if (verify === OTP) {
    alert("Your Account has been verified succesfully!")
    clearOTPs()
  } else {
    alert("Your verification failed!")
  }
})