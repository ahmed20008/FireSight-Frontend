import toastr from 'toastr'

const options = {
  "closeButton": true,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
  "showMethod": "slideDown",
  "hideMethod": "slideUp"
}

export function toastrOnTopCenter(message, type) { //type could be success or error
  toastr.options = {
    ...options,
    "positionClass": "toast-top-center",
  }

  toastr[type](message);
}

export function toastrOnBottomLeft(message, type) { //type could be success or error
  toastr.options = {
    ...options,
    "positionClass": "toast-bottom-left",
  }

  toastr[type](message);
}

export function toastrOnBottomRight(message, type) { //type could be success or error
  toastr.options = {
    ...options,
    "positionClass": "toast-bottom-right",
  }

  toastr[type](message);
}