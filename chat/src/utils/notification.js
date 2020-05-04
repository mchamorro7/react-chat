import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const customAlert = withReactContent(Swal);

export const showError = (text) => {
    customAlert.fire({
        icon: 'error',
        title: 'Oops...',
        text: text
    });
}