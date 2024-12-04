import Toastify from 'toastify-js';

export const toastify = {
    signupSuccessful: (text: string) => {
      Toastify({
        text: text,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #28a745, #85d396) ",
          width: "15rem",
          position: "fixed",
          right: "2.5rem",
          top: "2rem",
          zIndex: "1000",
          padding: "1rem",
          borderRadius: "1rem",
          textAlign: "center",
        },
        duration: 3000,
    }).showToast();
  },
  siginSuccessful: (text: string) => {
    Toastify({
      text: text,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #28a745, #85d396) ",
        width: "15rem",
        position: "fixed",
        right: "2.5rem",
        top: "2rem",
        zIndex: "1000",
        padding: "1rem",
        borderRadius: "1rem",
        textAlign: "center",
      },
      duration: 3000,
  }).showToast();
},
  delete: (text: string) => {
    Toastify({
      text: text,
      gravity: "top",
      position: "right",
      style: {
        background: "red",
        width: "15rem",
        position: "fixed",
        right: "2.5rem",
        top: "2rem",
        zIndex: "1000",
        padding: "1rem",
        borderRadius: "1rem",
        textAlign: "center",
      },
      duration: 3000,
  }).showToast();
},
update: (text: string) => {
  Toastify({
    text: text,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #28a745, #85d396) ",
      width: "15rem",
      position: "fixed",
      right: "2.5rem",
      top: "2rem",
      zIndex: "1000",
      padding: "1rem",
      borderRadius: "1rem",
      textAlign: "center",
    },
    duration: 3000,
}).showToast();
},
}
