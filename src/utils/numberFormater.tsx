

export const numberFormat = (event: any) => {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    input.value = value;
}

export const phoneNumberFormat = (event: any) => {
    const input = event.target
    let value = input.value.replace(/\D/g, "") // Remove non-numeric characters
    input.value = value
  }